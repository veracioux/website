#!/usr/bin/env sh

# Run this script to deploy the server

set -e
./wait-for-it.sh -h "$DB_HOST" -p "$DB_PORT" -t 10000
set +e

echo "Running production server on port $PORT"

sed -i s/'$PORT'/"$PORT"/g /etc/nginx/nginx.conf

export VERACIOUX_PRODUCTION=true

python3 manage.py collectstatic
python3 loaddata projects.json
python3 manage.py migrate

uvicorn backend.asgi:application --host 0.0.0.0 --port 8000 &

# Wait for uvicorn to start up properly
echo -n 'uvicorn pid: '
until pgrep uvicorn; do
    :
done
nginx -g "daemon off;"
