#!/usr/bin/env sh

# Deploy the production build of the server. This script should also be used for
# the staging build (ENVIRONMENT=staging), just make sure to set the
# environment variables.

[ -z "$ENVIRONMENT" ] && export ENVIRONMENT=prod

echo "Running production web server on port $WEB_PORT"

set -e

jinja2 -D env="$ENVIRONMENT" -D device="$DEVICE" nginx.conf.in \
    | envsubst '$WEB_PORT,$WEB_PORT_STAGING,$BACKEND_HOST,$BACKEND_PORT,$WORKER_SERVER_HOST,$WORKER_SERVER_PORT' \
    > /etc/nginx/nginx.conf

php-fpm81
nginx -g "daemon off;"
