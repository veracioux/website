#!/usr/bin/env sh

# Run this script to deploy the server in production mode

uvicorn backend.asgi:application --host 0.0.0.0 --port 8000 &

# Wait for uvicorn to start up properly
echo -n 'uvicorn pid: '
until pgrep uvicorn; do
    :
done
nginx -g "daemon off;"
