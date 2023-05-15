DOCKER_BUILD_IMAGE_NAME = haa-what-test/app
DOCKER_BUILD_IMAGE_NAME_FRONTEND = haa-what-test/app-frontend
DOCKER_BUILD_IMAGE_NAME_BACKEND = haa-what-test/app-backend
DOCKER_BUILDER_BUILD_IMAGE_BACKEND_NAME = $(DOCKER_BUILD_IMAGE_NAME_BACKEND)-builder

# Get override file name
ifdef SECUREDEV
OVERRIDE_FILE_NAME = deployment/docker-compose.secure.development.yml
else ifdef PRODUCTION
OVERRIDE_FILE_NAME = deployment/docker-compose.production.yml
else
OVERRIDE_FILE_NAME = development/docker-compose.development.yml
endif

PROJECT_ROOT_PATH := $(abspath $(patsubst %/,%,$(dir $(lastword $(MAKEFILE_LIST)))))
export DOCKER_BUILDKIT ?= 1

# Main functions
all: install
install: down-then-install
hard-install: destroy-then-install

install-dev: down-then-install fill-dev-data
hard-install-dev: destroy-then-install fill-dev-data

run: docker-build-backend docker-migrate-database docker-run-all

# Not needed
#test: docker-build-backend docker-run-test-backend docker-run-test-frontend
# Main functions

# Dev helper functions
fill-dev-data: fill-dev-product-data
# Dev helper functions

stop-server: docker-down
destroy-server: docker-down-w-volumes

post-install-setup: docker-setup-superuser
server-install: docker-build-backend docker-migrate-database post-install-setup

down-then-install: stop-server server-install
destroy-then-install: destroy-server server-install



docker-build-backend:
	docker build \
    		--progress=plain \
    		--target=builder \
    		-t $(DOCKER_BUILDER_BUILD_IMAGE_BACKEND_NAME) \
    		backend
	docker build \
		--progress=plain \
		--target=app \
		-t $(DOCKER_BUILD_IMAGE_NAME_BACKEND) \
		backend

docker-run-all:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) up --remove-orphans

docker-down-w-volumes:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) down --volumes --remove-orphans

docker-down:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) down --remove-orphans

docker-migrate-database:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm -e LOAD_ADMIN_APP=1 api python manage.py migrate

fill-dev-product-data:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py createrandomproducts

docker-setup-superuser:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py createsuperuser --noinput

docker-run-test-backend:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py test

docker-run-test-frontend:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm frontend bash -c "yarn test --watchAll=false && yarn typecheck && yarn lint"
