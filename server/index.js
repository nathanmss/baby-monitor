/**
 * Baby Monitor Server - Main entry point
 * Real-time baby monitor using WebRTC with SSE signaling
 */

const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');

const { matchRoute, sendJson, isValidSessionName } = require('./utils');
const { getAllSessions } = require('./session-manager');
const { handleSenderSSE, handleReceiverSSE } = require('./sse-manager');
const { handleSignal } = require('./signal-router');
const { handleMusicApi } = require('./music-api');
const { sendFile, serveMp3, servePublic } = require('./static-server');
const { buildRtcConfig, isRelayAvailable, getRelayError } = require('./relay-manager');

/**
 * Load .env file if it exists (no external dependencies)
 * @param {string} baseDir - Base directory of the application
 * @returns {object} Environment configuration
 */
function loadEnv(baseDir) {
    try {
        const envPath = path.join(baseDir, '.env');
        if (fs.existsSync(envPath)) {
            const envFile = fs.readFileSync(envPath, 'utf8');
            for (const line of envFile.split('\n')) {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const [key, ...valueParts] = trimmed.split('=');
                    if (key && valueParts.length > 0) {
                        process.env[key.trim()] = valueParts.join('=').trim();
                    }
                }
            }
        }
    } catch (e) {
        // Ignore .env loading errors
    }

    return {
        ENABLE_DEBUG_TIMER: process.env.ENABLE_DEBUG_TIMER === 'true',
        PORT: parseInt(process.env.PORT || '3000', 10),
        SSL_KEY: process.env.SSL_KEY,
        SSL_CERT: process.env.SSL_CERT,
        HTTPS: process.env.HTTPS === 'true'
    };
}

/**
 * Create and configure the HTTP/HTTPS server
 * @param {string} baseDir - Base directory of the application
 * @returns {{ server: http.Server | https.Server, config: object, isHttps: boolean }}
 */
function createServer(baseDir) {
    const config = loadEnv(baseDir);

    const requestHandler = async (req, res) => {
        const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const pathname = parsedUrl.pathname;
        const query = Object.fromEntries(parsedUrl.searchParams);
        const method = req.method;

        // API Routes
        if (method === 'GET') {
            // SSE sender endpoint
            let params = matchRoute('/api/sse/sender/:session', pathname);
            if (params) {
                if (!isValidSessionName(params.session)) {
                    return sendJson(res, { error: 'Invalid session name' }, 400);
                }
                return handleSenderSSE(req, res, params.session, query.transport);
            }

            // SSE receiver endpoint
            params = matchRoute('/api/sse/receiver/:session', pathname);
            if (params) {
                if (!isValidSessionName(params.session)) {
                    return sendJson(res, { error: 'Invalid session name' }, 400);
                }
                return handleReceiverSSE(req, res, params.session);
            }

            // Session status endpoint
            params = matchRoute('/api/status/:session', pathname);
            if (params) {
                if (!isValidSessionName(params.session)) {
                    return sendJson(res, { error: 'Invalid session name' }, 400);
                }
                const sessions = getAllSessions();
                const session = sessions.get(params.session);
                return sendJson(res, {
                    senderActive: session ? (session.sender !== null && session.senderRes !== null) : false,
                    receiverCount: session ? session.receivers.size : 0
                });
            }

            // Global status endpoint
            if (pathname === '/api/status') {
                const sessions = getAllSessions();
                let activeSessions = 0;
                let totalReceivers = 0;
                sessions.forEach((session) => {
                    if (session.sender !== null) {
                        activeSessions++;
                    }
                    totalReceivers += session.receivers.size;
                });
                return sendJson(res, { activeSessions, totalReceivers });
            }

            // Music API endpoint
            if (pathname === '/api/music') {
                return handleMusicApi(res, query, baseDir, config.ENABLE_DEBUG_TIMER);
            }

            // WebRTC runtime config endpoint
            if (pathname === '/api/webrtc-config') {
                const transport = query.transport === 'relay' ? 'relay' : 'direct';
                return sendJson(res, buildRtcConfig({ transport }));
            }

            // Page routes
            if (pathname === '/' || pathname === '/index.html') {
                return sendFile(res, path.join(baseDir, 'public', 'index.html'));
            }

            if (pathname === '/start' || pathname === '/start.html') {
                return sendFile(res, path.join(baseDir, 'public', 'start.html'));
            }

            if (pathname === '/sender' || pathname === '/sender.html') {
                return sendFile(res, path.join(baseDir, 'public', 'sender.html'));
            }

            if (pathname === '/receiver' || pathname === '/receiver.html') {
                return sendFile(res, path.join(baseDir, 'public', 'receiver.html'));
            }

            // Session URLs (/s/:session -> sender, /r/:session -> receiver)
            params = matchRoute('/s/:session', pathname);
            if (params) {
                if (!isValidSessionName(params.session)) {
                    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('Invalid session name');
                    return;
                }
                return sendFile(res, path.join(baseDir, 'public', 'sender.html'));
            }

            params = matchRoute('/r/:session', pathname);
            if (params) {
                if (!isValidSessionName(params.session)) {
                    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('Invalid session name');
                    return;
                }
                return sendFile(res, path.join(baseDir, 'public', 'receiver.html'));
            }

            // Manifest route shortcut
            if (pathname === '/manifest.json' || pathname === '/manifest.webmanifest') {
                return sendFile(res, path.join(baseDir, 'public', 'manifest.webmanifest'));
            }

            // Static files from /mp3
            if (serveMp3(res, pathname, baseDir)) {
                return;
            }

            // Static files from /public
            if (servePublic(res, pathname, baseDir)) {
                return;
            }

            // 404 for unmatched GET requests
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
            res.end('Not Found');
            return;
        }

        if (method === 'POST') {
            // Signal endpoint
            if (pathname === '/api/signal') {
                return handleSignal(req, res);
            }

            // 404 for unmatched POST requests
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
            res.end('Not Found');
            return;
        }

        // Method not allowed
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
        res.end('Method Not Allowed');
    };

    let server;
    let isHttps = false;

    // Check for HTTPS configuration
    if (config.SSL_KEY && config.SSL_CERT && fs.existsSync(config.SSL_KEY) && fs.existsSync(config.SSL_CERT)) {
        try {
            const httpsOptions = {
                key: fs.readFileSync(config.SSL_KEY),
                cert: fs.readFileSync(config.SSL_CERT)
            };
            server = https.createServer(httpsOptions, requestHandler);
            isHttps = true;
        } catch (e) {
            console.warn('Failed to load SSL certificates, falling back to HTTP:', e.message);
            server = http.createServer(requestHandler);
        }
    } else {
        server = http.createServer(requestHandler);
    }

    return { server, config, isHttps };
}

/**
 * Start the server
 * @param {string} baseDir - Base directory of the application
 */
function startServer(baseDir) {
    const { server, config, isHttps } = createServer(baseDir);
    const protocol = isHttps ? 'https' : 'http';

    server.listen(config.PORT, '0.0.0.0', () => {
        console.log(`Baby Monitor server running at ${protocol}://0.0.0.0:${config.PORT}`);
        console.log(`Local address: ${protocol}://localhost:${config.PORT}`);
        console.log('Using SSE for signaling (no WebSockets required)');
        console.log('Pure Node.js server with optional server-side WebRTC relay');

        if (isRelayAvailable()) {
            console.log('Relay mode available via server-side WebRTC (@roamhq/wrtc)');
        } else {
            console.log('Relay mode unavailable:', getRelayError() || 'server relay dependency missing');
        }
    });

    // Graceful shutdown
    const shutdown = () => {
        console.log('Stopping server...');
        server.close(() => {
            console.log('Server stopped cleanly.');
            process.exit(0);
        });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    return server;
}

module.exports = {
    loadEnv,
    createServer,
    startServer
};
