/**
 * Utility functions for the baby monitor server
 */

// MIME types for static file serving
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.webmanifest': 'application/manifest+json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.webm': 'video/webm',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

/**
 * Generate unique IDs for sessions and connections
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Validate session name to prevent injection or malformed paths
 * @param {string} name
 * @returns {boolean}
 */
function isValidSessionName(name) {
    if (!name || typeof name !== 'string') return false;
    return /^[a-zA-Z0-9_\-\.]{1,64}$/.test(name);
}

/**
 * Parse JSON body from request with size limit
 * @param {http.IncomingMessage} req
 * @returns {Promise<object>}
 */
function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            // Limit body size to 1MB
            if (body.length > 1048576) {
                reject(new Error('Body too large'));
            }
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                reject(new Error('Invalid JSON'));
            }
        });
        req.on('error', reject);
    });
}

/**
 * Send JSON response
 * @param {http.ServerResponse} res
 * @param {object} data
 * @param {number} statusCode
 */
function sendJson(res, data, statusCode = 200) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN'
    });
    res.end(JSON.stringify(data));
}

/**
 * Match URL pattern with parameters (e.g., /api/sse/sender/:session)
 * @param {string} pattern - URL pattern with :param placeholders
 * @param {string} pathname - Actual URL path
 * @returns {object|null} - Extracted params or null if no match
 */
function matchRoute(pattern, pathname) {
    const patternParts = pattern.split('/');
    const pathParts = pathname.split('/');

    if (patternParts.length !== pathParts.length) return null;

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
        if (patternParts[i].startsWith(':')) {
            params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
        } else if (patternParts[i] !== pathParts[i]) {
            return null;
        }
    }
    return params;
}

module.exports = {
    MIME_TYPES,
    generateId,
    isValidSessionName,
    parseJsonBody,
    sendJson,
    matchRoute
};
