#!/usr/bin/env bash

[ -z "$ENVIRONMENT" ] && ENVIRONMENT=prod

. scripts/load-env.bash.in

cat nginx.host.conf.in | envsubst '$WEB_PORT,$USER_HOME,$DOCKER_REGISTRY_PORT' > /etc/nginx/nginx.conf

pkill nginx
nginx
