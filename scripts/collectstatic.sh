#!/usr/bin/env sh

python3 manage.py collectstatic --noinput

stg="$([ "$ENVIRONMENT" = "staging" ] && echo 'stg/')"

cp -r frontend/dist/"${stg}"static/* /var/static_root/
