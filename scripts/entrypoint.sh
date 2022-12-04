#!/usr/bin/env sh

echo "Running web server on port $WEB_PORT"

set -e

    | envsubst '$WEB_PORT,$WEB_PORT_STAGING,$FRONTEND_DEV_HOST,$FRONTEND_DEV_PORT,$API_HOST,$API_PORT,$WORKER_SERVER_HOST,$WORKER_SERVER_PORT' \
jinja2 -D env="$ENVIRONMENT" -D machine="$MACHINE" nginx.conf.in \
    > /etc/nginx/nginx.conf

php-fpm81
nginx -g "daemon off;"
