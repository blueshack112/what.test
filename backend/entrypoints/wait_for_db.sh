#!/bin/bash

# if any of the commands in your code fails for any reason, the entire script fails
set -o errexit
# fail exit if one of your pipe command fails
set -o pipefail
# exits if any of your variables is not set
set -o nounset

postgres_ready() {
python << END
import sys

import psycopg2

try:
    psycopg2.connect(
        dbname="${POSTGRES_DB}",
        user="${POSTGRES_USER}",
        password="${POSTGRES_PASSWORD}",
        host="${DJANGO_SETTINGS_POSTGRES_DB_HOST}",
        port="${DJANGO_SETTINGS_POSTGRES_DB_PORT}",
    )
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)

END
}
until postgres_ready; do
  >&2 echo 'Wait-for-db-script: Waiting for PostgreSQL to become available...'
  sleep 1
done
>&2 echo 'Wait-for-db-script: PostgreSQL is available'

exec "$@"