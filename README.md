# Archibald - Open Source Cloud Architecture Visualization Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=flat&logo=chakra-ui&logoColor=white)](https://chakra-ui.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![Zustand](https://img.shields.io/badge/Zustand-593D88?style=flat&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)

Archibald is an open-source cloud architecture visualization tool that helps you create, edit, and share cloud architecture diagrams for multiple cloud providers including AWS, GCP, OpenShift, and more.

## Features

- Multi-cloud provider support
- Drag-and-drop interface for creating architecture diagrams
- Real-time collaboration
- Export diagrams to various formats
- Custom component support
- Modern and intuitive UI

## Development Setup

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) v16 or higher (only needed for local development without Docker)
- [npm](https://www.npmjs.com/) v7 or higher (only needed for local development without Docker)

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

To run the development image:
```bash
# For AMD64/x86_64 systems
docker run -p 5173:5173 eooo/archibald:development-amd64-latest

# For ARM64/aarch64 systems
docker run -p 5173:5173 eooo/archibald:development-arm64-latest
```

To run the production image:
```bash
# For AMD64/x86_64 systems
docker run -p 3000:3000 eooo/archibald:amd64-latest

# For ARM64/aarch64 systems
docker run -p 3000:3000 eooo/archibald:arm64-latest
```

The development server will be available at http://localhost:5173
The production server will be available at http://localhost:3000

#### Building Locally

1. Clone the repository:
```bash
git clone https://github.com/yourusername/archibald.git
cd archibald
```

2. Start the development environment:
```bash
./scripts/dev.sh up
```

The application will be available at http://localhost:5173

### Development Commands

The `dev.sh` script provides several useful commands for development:

```bash
./scripts/dev.sh <command>
```

Available commands:
- `up` - Start the development environment
- `down` - Stop the development environment
- `restart` - Restart the development environment
- `logs` - Show logs from all containers
- `shell` - Open a shell in the app container
- `clean` - Remove all containers and volumes
- `rebuild` - Rebuild and restart containers
- `install` - Install/update npm dependencies
- `lint` - Run linter
- `test` - Run tests

### Local Development without Docker

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173

## Project Structure

```
archibald/
├── src/
│   ├── components/     # React components
│   ├── store/         # State management
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── public/            # Static assets
├── scripts/           # Development scripts
└── docker/           # Docker configuration
```

## Development Notes

### Docker Development

- Persistent data is stored in `~/.docker/archibald/`
- Node modules are cached in a named volume
- Hot reloading is enabled by default
- Resource limits are set to prevent container overuse
- Log rotation is configured to manage disk space

### Architecture

- Frontend: React + TypeScript
- State Management: Zustand
- UI Components: Chakra UI
- Diagram Creation: Reactflow
- Build Tool: Vite

### Environment Variables

The following environment variables can be set:

```env
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

Please make sure to update tests as appropriate.

## Troubleshooting

### Common Issues

1. **Docker container won't start**
   - Check Docker daemon is running
   - Verify ports 5173 is not in use
   - Check logs with `./scripts/dev.sh logs`

2. **Hot reload not working**
   - Ensure `CHOKIDAR_USEPOLLING` is set to true in docker-compose.yml
   - Check container logs for file watching errors

3. **Performance issues**
   - Check container resource usage
   - Verify Docker resource limits in docker-compose.yml

### Getting Help

If you encounter any issues:
1. Check the logs using `./scripts/dev.sh logs`
2. Open an issue on GitHub with:
   - Description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details

## License

This project is licensed under the MIT License - see the LICENSE file for details.
