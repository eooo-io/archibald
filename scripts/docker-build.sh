#!/bin/bash

# Exit on error
set -e

# Default values
DEFAULT_TAG="latest"
IMAGE_NAME="eooo/archibald"

# Parse command line arguments
TAG="${1:-$DEFAULT_TAG}"

# Check if Docker buildx is available
if ! docker buildx version > /dev/null 2>&1; then
    echo "Error: Docker buildx is not available. Please install it first."
    exit 1
fi

# Create and use a new builder instance
docker buildx create --use --name archibald-builder

# Build and push development images for amd64
echo "Building and pushing amd64 development images..."
docker buildx build \
    --platform=linux/amd64 \
    --target development \
    --tag ${IMAGE_NAME}:development-amd64-${TAG} \
    --push \
    .

# Build and push development images for arm64
echo "Building and pushing arm64 development images..."
docker buildx build \
    --platform=linux/arm64 \
    --target development \
    --tag ${IMAGE_NAME}:development-arm64-${TAG} \
    --push \
    .

# Build and push production images for amd64
echo "Building and pushing amd64 production images..."
docker buildx build \
    --platform=linux/amd64 \
    --target production \
    --tag ${IMAGE_NAME}:amd64-${TAG} \
    --push \
    .

# Build and push production images for arm64
echo "Building and pushing arm64 production images..."
docker buildx build \
    --platform=linux/arm64 \
    --target production \
    --tag ${IMAGE_NAME}:arm64-${TAG} \
    --push \
    .

# Clean up the builder instance
docker buildx rm archibald-builder

echo "Successfully built and pushed all images!"
echo "Development images:"
echo "  - ${IMAGE_NAME}:development-amd64-${TAG}"
echo "  - ${IMAGE_NAME}:development-arm64-${TAG}"
echo "Production images:"
echo "  - ${IMAGE_NAME}:amd64-${TAG}"
echo "  - ${IMAGE_NAME}:arm64-${TAG}"
