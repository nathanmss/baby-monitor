# Multi-stage / optimized Dockerfile for Baby Monitor
FROM node:20-bookworm-slim AS base

# Install system dependencies required for native WebRTC modules
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json* ./

# Install production dependencies
RUN npm ci --omit=dev --ignore-scripts || npm install --omit=dev

# Copy application files
COPY server/ ./server/
COPY public/ ./public/
COPY mp3/ ./mp3/
COPY server.js ./

# Set permissions for node user
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Environment defaults
ENV NODE_ENV=production \
    PORT=3000

# Expose HTTP port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/status || exit 1

# Start the application
CMD ["node", "server.js"]
