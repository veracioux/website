#!/usr/bin/env sh

mkdir -p /app/frontend/dist/static

python3 manage.py collectstatic --noinput
