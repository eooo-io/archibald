#!/bin/bash

# Create base directory for Docker volumes
DOCKER_DIR="$HOME/.docker/archibald"

# Create directories for each volume
mkdir -p "$DOCKER_DIR/app_node_modules"
mkdir -p "$DOCKER_DIR/app_cache"

# Set permissions
chmod 755 "$DOCKER_DIR"
chmod 755 "$DOCKER_DIR/app_node_modules"
chmod 755 "$DOCKER_DIR/app_cache"

echo "Created Docker volume directories in $DOCKER_DIR"
echo "You can now run 'docker-compose up'"
