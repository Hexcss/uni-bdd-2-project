# Define service directories
SERVICE_DIRS := api-images api-auth api-crud front-landing front-cms

# Ports used by your services
SERVICE_PORTS := 3014 3012 3013 3010 3011

# Default target to bring up all services
all: mongo_up services_up

# Target to start MongoDB using Docker Compose
mongo_up:
	cd mongo && docker compose up -d

# Target to run npm run dev in each service directory
services_up:
	$(foreach dir,$(SERVICE_DIRS),cd $(dir) && npm run dev &)

# Helper target to stop MongoDB
mongo_down:
	cd mongo && docker compose down

# Target to stop all services
services_down:
	$(foreach port,$(SERVICE_PORTS),lsof -ti :$(port) | xargs -r kill -9;)

# Stop all services and MongoDB
stop: services_down mongo_down

# Include a clean target if needed, for example to remove node_modules or other generated files
clean:
	$(foreach dir,$(SERVICE_DIRS),rm -rf $(dir)/node_modules)
