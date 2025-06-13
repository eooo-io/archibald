# syntax=docker/dockerfile:1

# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ARG TARGETARCH
RUN echo "Building for architecture: $TARGETARCH"
RUN npm run build

# Development stage
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ENV NODE_ENV=development
ENV VITE_BASE_URL=/
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "--port", "5173"]

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install -g serve
EXPOSE 3000
ENV NODE_ENV=production
CMD ["serve", "-s", "dist", "-l", "3000"]

# Default target stage
FROM development
