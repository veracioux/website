#!/usr/bin/env sh

# Run this to deploy the server in production mode
# gunicorn backend.asgi:application --host 0.0.0.0 --port 8000 &
pipenv sync
pipenv run uvicorn backend.asgi:application --host 0.0.0.0 --port 8000 &
nginx -g "daemon off;"
