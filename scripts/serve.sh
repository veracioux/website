#!/usr/bin/env bash

[ -z "$ENVIRONMENT" ] && ENVIRONMENT=prod

. scripts/load-env.bash.in

cat nginx.host.conf | envsubst '$PORT,$USER_HOME' > /etc/nginx/nginx.conf

pkill nginx
nginx
