#!/usr/bin/env sh

echo "Running web server on port $WEB_PORT"

set -e

jinja2 -D env="$ENVIRONMENT" -D machine="$MACHINE" nginx.conf.in \
    | envsubst '$WEB_PORT,$WEB_PORT_STAGING,$FRONTEND_HOST,$FRONTEND_PORT,$API_HOST,$API_PORT,$WORKER_SERVER_HOST,$WORKER_SERVER_PORT' \
    > /etc/nginx/nginx.conf

php-fpm81
nginx -g "daemon off;"
