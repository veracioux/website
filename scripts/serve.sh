#!/usr/bin/env bash

# The `serve` script (managed by tem) should be run to serve the website on a
# dedicated host. That script in turn runs this script with sudo access, and
# that's the only reason this script is separate.

# Do not run this script directly, unless you know what you are doing. Note that
# you need to set $USER_HOME to $HOME of the non-root user invoking the script.

[ -z "$ENV" ] && ENV=staging

kill "$(cat /run/nginx.pid)"

. scripts/load-env.bash.in

# If the nginx config is sound, back it up
if nginx -t 2>/dev/null; then
    cp /etc/nginx/nginx.conf{,.bak}
fi

cat host/nginx.conf.in | envsubst '$WEB_PORT,$WEB_PORT_STAGING,$USER_HOME,$DOCKER_REGISTRY_PORT' > /etc/nginx/nginx.conf
# Create file in case it doesn't exist, so nginx doesn't complain
cp nginx.tmp.conf /etc/nginx/nginx.tmp.conf 2>/dev/null
touch /etc/nginx/nginx.tmp.conf

config_check_output="$(nginx -t 2>&1)"

if [ "$?" = 0 ]; then
    pkill nginx
    nginx
    echo "Successfully started nginx." >&2
else
    cp /etc/nginx/nginx.conf{.bak,}
    echo "Error: nginx config invalid." >&2
    echo "$config_check_output"
    if nginx -t 2>/dev/null; then
        echo "Starting nginx using previous config..." >&2
        pkill nginx
        nginx
    fi
fi
