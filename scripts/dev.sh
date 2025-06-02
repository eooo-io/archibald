#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display usage
usage() {
    echo -e "${BLUE}Usage: $0 [command]${NC}"
    echo
    echo "Commands:"
    echo "  up        - Start the development environment"
    echo "  down      - Stop the development environment"
    echo "  restart   - Restart the development environment"
    echo "  logs      - Show logs from all containers"
    echo "  shell     - Open a shell in the app container"
    echo "  clean     - Remove all containers and volumes"
    echo "  rebuild   - Rebuild and restart containers"
    echo "  install   - Install/update npm dependencies"
    echo "  lint      - Run linter"
    echo "  test      - Run tests"
    exit 1
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker first."
    exit 1
fi

# Create required directories if they don't exist
setup_dirs() {
    DOCKER_DIR="$HOME/.docker/archibald"
    mkdir -p "$DOCKER_DIR/app_node_modules"
    mkdir -p "$DOCKER_DIR/app_cache"
    chmod 755 "$DOCKER_DIR" "$DOCKER_DIR/app_node_modules" "$DOCKER_DIR/app_cache"
}

# Execute command in the app container
exec_in_container() {
    docker-compose exec app "$@"
}

# Main command handling
case "$1" in
    "up")
        setup_dirs
        echo -e "${GREEN}Starting development environment...${NC}"
        docker-compose up -d
        echo -e "${GREEN}Development environment is ready at http://localhost:5173${NC}"
        ;;
    "down")
        echo -e "${GREEN}Stopping development environment...${NC}"
        docker-compose down
        ;;
    "restart")
        echo -e "${GREEN}Restarting development environment...${NC}"
        docker-compose restart
        ;;
    "logs")
        docker-compose logs -f
        ;;
    "shell")
        echo -e "${GREEN}Opening shell in app container...${NC}"
        exec_in_container sh
        ;;
    "clean")
        echo -e "${GREEN}Removing all containers and volumes...${NC}"
        docker-compose down -v
        ;;
    "rebuild")
        echo -e "${GREEN}Rebuilding containers...${NC}"
        docker-compose down
        docker-compose build --no-cache
        docker-compose up -d
        ;;
    "install")
        echo -e "${GREEN}Installing dependencies...${NC}"
        exec_in_container npm install
        ;;
    "lint")
        echo -e "${GREEN}Running linter...${NC}"
        exec_in_container npm run lint
        ;;
    "test")
        echo -e "${GREEN}Running tests...${NC}"
        exec_in_container npm test
        ;;
    *)
        usage
        ;;
esac
