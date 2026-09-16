# Multi-stage Dockerfile for Upstairs Flooring Web App with persistent shared progress

# Stage 1: Build Vite & React static distribution
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production Server with persistent API storage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /app/dist

# Copy server scripts
COPY server.js ./
COPY src/server ./src/server

# Create data directory and configure ownership for unprivileged node user
RUN mkdir -p /app/data && chown -R node:node /app

# Run as non-root user for container security
USER node

EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080
ENV DATA_DIR=/app/data

CMD ["node", "server.js"]
