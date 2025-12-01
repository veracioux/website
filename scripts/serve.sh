#!/usr/bin/env bash

if [ -z "$USER_HOME" ]; then
    echo "Error: Please set USER_HOME to the HOME of the main data user." >&2
    exit 1
fi

[ -z "$ENV" ] && ENV=staging

kill "$(cat /run/nginx.pid)"

. scripts/load-env.bash.in

# If the nginx config is sound, back it up
if nginx -t 2>/dev/null; then
    cp /etc/nginx/nginx.conf{,.bak}
fi

if [ -z "$WEB_PORT" ]; then
    echo "Error: Please set WEB_PORT environment variable in the .env.d files." >&2
    exit 1
fi

if [ -z "$WEB_PORT_STAGING" ]; then
    echo "Error: Please set WEB_PORT_STAGING environment variable in the .env.d files." >&2
    exit 1
fi

if [ -z "$DOCKER_REGISTRY_PORT" ]; then
    echo "Error: Please set DOCKER_REGISTRY_PORT environment variable in the .env.d files." >&2
    exit 1
fi

cat host/nginx.conf.in | envsubst '$WEB_PORT,$WEB_PORT_STAGING,$USER_HOME,$DOCKER_REGISTRY_PORT' > /etc/nginx/nginx.conf

config_check_output="$(nginx -t 2>&1)"

if [ "$?" = 0 ]; then
    systemctl reload nginx
    echo "Successfully started nginx." >&2
else
    echo "Error in nginx configuration:" >&2
    echo "$config_check_output" >&2

    tempdir="$(mktemp -t  -d XXXXX)"
    cp /etc/nginx/nginx.conf "$tempdir/nginx.conf"
    echo "View the failed configuration file here: $tempdir/nginx.conf" >&2

    cp /etc/nginx/nginx.conf{.bak,}
fi
