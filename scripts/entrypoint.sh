#!/usr/bin/env sh

echo "Running web server on port $WEB_PORT"

set -e

jinja2 -D env="$ENVIRONMENT" -D device="$DEVICE" nginx.conf.in \
    | envsubst '$WEB_PORT,$WEB_PORT_STAGING,$BACKEND_HOST,$BACKEND_PORT,$WORKER_SERVER_HOST,$WORKER_SERVER_PORT' \
    > /etc/nginx/nginx.conf

php-fpm81
nginx -g "daemon off;"
