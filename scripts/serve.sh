#!/usr/bin/env bash

[ -z "$ENVIRONMENT" ] && ENVIRONMENT=staging

. scripts/load-env.bash.in

# If the nginx config is sound, back it up
if nginx -t; then
    cp /etc/nginx/nginx.conf{,.bak}
fi

cat nginx.host.conf.in | envsubst '$WEB_PORT,$WEB_PORT_STAGING,$USER_HOME,$DOCKER_REGISTRY_PORT' > /etc/nginx/nginx.conf

if nginx -t; then
    pkill nginx
    nginx
    echo "Successfully started nginx." >&2
else
    cp /etc/nginx/nginx.conf{.bak,}
    echo "Error: nginx config invalid." >&2
    if nginx -t; then
        echo "Starting nginx using previous config..." >&2
        nginx
    fi
fi
