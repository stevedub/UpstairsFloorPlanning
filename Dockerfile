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

# Create data directory for persistent volume mount
RUN mkdir -p /app/data

EXPOSE 80

ENV NODE_ENV=production
ENV PORT=80
ENV DATA_DIR=/app/data

CMD ["node", "server.js"]
