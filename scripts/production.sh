#!/usr/bin/env sh

# Run this script to deploy the server
set -e
scripts/wait-for-it.sh -h "$DB_HOST" -p "$DB_PORT" -t 10000
scripts/wait-for-it.sh -h "$WORKER_SERVER_HOST" -p "$WORKER_SERVER_PORT" -t 10000
set +e

echo "Running production server on port $PORT"
envsubst < nginx.conf > /etc/nginx/nginx.conf

python3 manage.py collectstatic
python3 loaddata projects.json
python3 manage.py migrate

uvicorn backend.asgi:application --host 0.0.0.0 --port $DJANGO_PORT &

# Wait for uvicorn to start up properly
echo -n 'uvicorn pid: '
until pgrep uvicorn; do
    :
done
nginx -g "daemon off;"
