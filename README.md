# Running the App with Docker

## Development Environment
For hot reloading with `ts-node-dev`:
```bash
docker-compose up app-development
```
This command starts the app in development mode with hot reloading enabled.

## Production Environment
To run the compiled JS version of the app:
```bash
docker-compose up app-production
```

This command builds and runs the app in production mode.

Ensure Docker and Docker Compose are installed on your system. Adjust docker-compose.yml and Dockerfiles as needed for your project.