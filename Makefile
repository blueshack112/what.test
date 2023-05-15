DOCKER_BUILD_IMAGE_NAME = $$TODO(malx/app)
DOCKER_BUILD_IMAGE_NAME_FRONTEND = $$TODO(malx/app-frontend)
DOCKER_BUILD_IMAGE_NAME_BACKEND = $$TODO(malx/app-backend)
DOCKER_BUILD_IMAGE_NAME_PYWINE = $$TODO(malx/pywine-host)
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
run-secure-dev: docker-build-backend docker-migrate-database docker-run-secure-dev

test: docker-build-backend docker-run-test-backend docker-run-test-frontend
# Main functions

# Dev helper functions
fill-dev-data: fill-dev-vulnerability-test-data fill-dev-packaged_test-data fill-dev-user-data
# Dev helper functions

server-install: docker-build-backend docker-migrate-database post-install-setup
post-install-setup: docker-prefill docker-create-groups docker-setup-superuser
down-then-install: stop-server server-install
destroy-then-install: destroy server-install
stop-server: docker-down
destroy: docker-down-w-volumes


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

docker-run-secure-dev:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) up --remove-orphans frontend db api admin nginx celery redis_queue


docker-down-w-volumes:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) down --volumes --remove-orphans

docker-down:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) down --remove-orphans

docker-migrate-database:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm -e LOAD_ADMIN_APP=1 api python manage.py migrate

docker-prefill:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py syncmitrefromcsv
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py synctestclasses

fill-dev-vulnerability-test-data:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py createrandomtests

fill-dev-packaged_test-data:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py createrandompackages

fill-dev-user-data:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py createrandomusers

docker-setup-superuser:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py createsuperuser --noinput

docker-create-groups:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py creategroups

docker-run-test-backend:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py test

docker-run-test-frontend:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm frontend bash -c "yarn test --watchAll=false && yarn typecheck && yarn lint"
