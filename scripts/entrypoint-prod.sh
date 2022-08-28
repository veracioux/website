#!/usr/bin/env sh

# Deploy the production build of the server. This script should also be used for
# the staging build (ENVIRONMENT=staging), just make sure to set the
# environment variables.

[ -z "$ENVIRONMENT" ] && export ENVIRONMENT=prod

echo -n "Running production web server on port $WEB_PORT"

set -e
scripts/wait-for-it.sh -h "$DB_HOST" -p "$DB_PORT" -t 180

cd worker/
pnpm run server &
cd ..

python3 manage.py collectstatic --noinput
python3 manage.py migrate
if [ "$ENVIRONMENT" = "staging" ]; then
    set +e
    python3 manage.py createsuperuser --noinput 2>&1 | sed 's/Error/Info/g' >&2
    set -e
fi
python3 manage.py loaddata projects.json

uvicorn backend.asgi:application --host $BACKEND_HOST --port $BACKEND_PORT &

# Wait for uvicorn to start up properly
echo -n 'uvicorn pid: '
until pgrep uvicorn; do
    :
done

jinja2 -D env="$ENVIRONMENT" nginx.conf.in \
    | envsubst '$WEB_PORT,$WEB_PORT_STAGING,$BACKEND_HOST,$BACKEND_PORT,$WORKER_SERVER_HOST,$WORKER_SERVER_PORT' \
    > /etc/nginx/nginx.conf

php-fpm8
nginx -g "daemon off;"
