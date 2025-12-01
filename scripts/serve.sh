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

cat host/nginx.conf.in | envsubst '$WEB_PORT,$WEB_PORT_STAGING,$USER_HOME,$DOCKER_REGISTRY_PORT' > /etc/nginx/nginx.conf

config_check_output="$(nginx -t 2>&1)"

if [ "$?" = 0 ]; then
    systemctl reload nginx
    echo "Successfully started nginx." >&2
else
    echo "Error in nginx configuration:" >&2
    echo "$config_check_output" >&2

    tempdir="$(mktemp XXXXX)"
    cp /etc/nginx/nginx.conf "$tempdir/nginx.conf"
    echo "View the failed configuration file here: $tempdir/nginx.conf" >&2

    cp /etc/nginx/nginx.conf{.bak,}
fi
