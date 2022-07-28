#!/usr/bin/env sh

[ -z "$ENVIRONMENT" ] && ENVIRONMENT=prod

jinja2 -D environment="$ENVIRONMENT" nginx.conf.in \
    | envsubst '$PORT,$BACKEND_HOST,$BACKEND_PORT,$WORKER_SERVER_HOST,$WORKER_SERVER_PORT' > /etc/nginx/nginx.conf

nginx -g "daemon off;"
