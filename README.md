# Archibald - Open Source Cloud Architecture Visualization Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-blue)](https://vitejs.dev/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-2-blue)](https://chakra-ui.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)

Archibald is an open-source cloud architecture visualization tool that helps you create, edit, and share cloud architecture diagrams for multiple cloud providers including AWS, GCP, OpenShift, and more.

## Application Components

Archibald consists of two main components:

1. **Cloud Architecture Editor** (Port 5173)
   - The main application for creating and editing cloud architecture diagrams
   - Features drag-and-drop interface, real-time collaboration, and multi-cloud support
   - Accessible at `http://localhost:5173/editor`

2. **Documentation Site** (Port 5174)
   - Built with VitePress, providing comprehensive guides and documentation
   - Includes getting started guides, tutorials, and cloud provider references
   - Accessible at `http://localhost:5174`

## Features

* Multi-cloud provider support
* Drag-and-drop interface for creating architecture diagrams
* Real-time collaboration
* Export diagrams to various formats
* Custom component support
* Modern and intuitive UI

## Development Setup

### Prerequisites

* Docker
* Docker Compose
* Node.js v16 or higher (only needed for local development without Docker)
* npm v7 or higher (only needed for local development without Docker)

### Quick Start with Docker

You can either build the images locally or pull them directly from DockerHub:

#### Using Pre-built Images

The following images are available on DockerHub:

Development images (with hot-reloading):
```bash
# For AMD64/x86_64 systems
docker pull eooo/archibald:development-amd64-latest

# For ARM64/aarch64 systems (e.g. Apple Silicon)
docker pull eooo/archibald:development-arm64-latest
```

Production images (optimized, smaller size):
```bash
# For AMD64/x86_64 systems
docker pull eooo/archibald:amd64-latest

# For ARM64/aarch64 systems (e.g. Apple Silicon)
docker pull eooo/archibald:arm64-latest
```

To run the development images:
```bash
# For AMD64/x86_64 systems
docker run -p 5173:5173 -p 5174:5174 eooo/archibald:development-amd64-latest

# For ARM64/aarch64 systems
docker run -p 5173:5173 -p 5174:5174 eooo/archibald:development-arm64-latest
```

To run the production images:
```bash
# For AMD64/x86_64 systems
docker run -p 3000:3000 -p 3001:3001 eooo/archibald:amd64-latest

# For ARM64/aarch64 systems
docker run -p 3000:3000 -p 3001:3001 eooo/archibald:arm64-latest
```

Access the applications at:
- Development:
  - Editor: http://localhost:5173/editor
  - Documentation: http://localhost:5174
- Production:
  - Editor: http://localhost:3000/editor
  - Documentation: http://localhost:3001

#### Building Locally

1. Clone the repository:
```bash
git clone https://github.com/eooo-io/archibald.git
cd archibald
```

2. Start the development environment:
```bash
./scripts/dev.sh up
```

The applications will be available at:
- Editor: http://localhost:5173/editor
- Documentation: http://localhost:5174

### Development Commands

The `dev.sh` script provides several useful commands for development:

```bash
./scripts/dev.sh <command>
```

Available commands:
* `up` - Start the development environment
* `down` - Stop the development environment
* `restart` - Restart the development environment
* `logs` - Show logs from all containers
* `shell` - Open a shell in the app container
* `clean` - Remove all containers and volumes
* `rebuild` - Rebuild and restart containers
* `install` - Install/update npm dependencies
* `lint` - Run linter
* `test` - Run tests

### Local Development without Docker

1. Install dependencies:
```bash
npm install
```

2. Start both the editor and documentation servers:
```bash
# In one terminal - start the editor
npm run dev

# In another terminal - start the documentation
npm run docs:dev
```

The applications will be available at:
- Editor: http://localhost:5173/editor
- Documentation: http://localhost:5174

## Project Structure

```
archibald/
├── src/              # React application source
│   ├── components/   # React components
│   ├── store/        # State management
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
├── docs/             # VitePress documentation
│   ├── guide/        # User guides
│   └── .vitepress/   # VitePress configuration
├── public/           # Static assets
└── scripts/          # Development scripts
```

## Development Notes

### Docker Development

* Persistent data is stored in `~/.docker/archibald/`
* Node modules are cached in a named volume
* Hot reloading is enabled by default for both editor and documentation
* Resource limits are set to prevent container overuse
* Log rotation is configured to manage disk space

### Architecture

* Editor:
  - Frontend: React + TypeScript
  - State Management: Zustand
  - UI Components: Chakra UI
  - Diagram Creation: Reactflow
  - Build Tool: Vite
* Documentation:
  - VitePress
  - Markdown
  - Vue.js (via VitePress)

### Environment Variables

The following environment variables can be set:
```bash
NODE_ENV=development
VITE_APP_VERSION=0.0.0
VITE_APP_NAME=Archibald
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests and documentation as appropriate.

## Troubleshooting

### Common Issues

1. **Docker containers won't start**
   * Check Docker daemon is running
   * Verify ports 5173 and 5174 are not in use
   * Check logs with `./scripts/dev.sh logs`

2. **Hot reload not working**
   * Ensure `CHOKIDAR_USEPOLLING` is set to true in docker-compose.yml
   * Check container logs for file watching errors

3. **Performance issues**
   * Check container resource usage
   * Verify Docker resource limits in docker-compose.yml

### Getting Help

If you encounter any issues:

1. Check the logs using `./scripts/dev.sh logs`
2. Open an issue on GitHub with:
   * Description of the problem
   * Steps to reproduce
   * Expected vs actual behavior
   * Environment details

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
