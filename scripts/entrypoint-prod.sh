#!/usr/bin/env sh

# Deploy the production build of the server. This script should also be used for
# the local preview (ENVIRONMENT=local) build, just make sure to set the
# environment variables.

[ -z "$ENVIRONMENT" ] && export ENVIRONMENT=prod

echo -n "Running production web server on port $PORT"

set -e
scripts/wait-for-it.sh -h "$DB_HOST" -p "$DB_PORT" -t 180

cd worker/
pnpm run server &
cd ..

python3 manage.py collectstatic --noinput
python3 manage.py migrate
if [ "$ENVIRONMENT" = "local" ]; then
    python3 manage.py createsuperuser --noinput
fi
python3 manage.py loaddata projects.json

uvicorn backend.asgi:application --host $BACKEND_HOST --port $BACKEND_PORT &

# Wait for uvicorn to start up properly
echo -n 'uvicorn pid: '
until pgrep uvicorn; do
    :
done

jinja2 -D environment="$ENVIRONMENT" nginx.conf.in \
    | envsubst '$PORT,$BACKEND_HOST,$BACKEND_PORT,$WORKER_SERVER_HOST,$WORKER_SERVER_PORT' \
    > /etc/nginx/nginx.conf
nginx -g "daemon off;"
