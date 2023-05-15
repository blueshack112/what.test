# What.Test #

### What is this repository for? ###

This is a test task meant to be delivered to What.

### Development

##### Prerequisites

- Docker Compose Cli Plugin

##### Setup up development environment

    make

##### Run (development servers)

    make run

##### Run tests (Currently None)

    make test

###### docker-compose.override.yml

Use `docker-compose.override.yml` to override compose settings locally.

###### Default Ports

- The database listens on host port 5454 by default and 5432 in the docker network
- The api server listens on port 8000 by default
- The admin server listens on port 8001 by default
- The frontend server listens on port 3000 by default

###### Access application

* Frontend: http://localhost:3000/
* API: http://localhost:8000/
* Admin: http://localhost:8001/

### Misc

##### TODO: Swagger UI

Accessing the API application root URL (`/`) launches [Swagger UI](https://swagger.io/tools/swagger-ui/).  
Swagger UI lists all public endpoints by default. In order to list all available endpoints you need to login using the
"Authorize" button. Just drop a valid token from the token endpoint with the prefix "Bearer" into the input field.
For example:

    Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjU4Njg0NTQsIm9yaWdfaWF0IjoxNTY1NzgyMDU0LCJ1c2VyX2lkIjoxLCJvcmdhX2lkIjoyLCJlbWFpbCI6ImJ1ZXR0Z2VuYmFjaEBkYXRhY29sbGVjdC5jb20iLCJpc19zdXBlcnVzZXIiOnRydWUsImlzX2Rpc3RyaWJ1dG9yIjp0cnVlLCJ0eiI6IkV1cm9wZS9CZXJsaW4ifQ.5S71Wauol5uNou2I2HxkeOunGP8ro_8X7h2_NNJO1Ck

##### Environment variables

There are several environment variables to control the application behaviour.

@TODO: Create complete list of existing environment variables.
