#!/usr/bin/env bash

cd /home/haris/website

cp /etc/nginx/nginx.conf{,.bak}

cp infra/nginx.conf /etc/nginx/nginx.conf

config_check_output="$(nginx -t 2>&1)"

if [ "$?" = 0 ]; then
    systemctl start nginx
    systemctl reload nginx
    echo "Successfully started nginx." >&2
else
    echo "Error in nginx configuration:" >&2
    echo "$config_check_output" >&2

    tempdir="$(mktemp -t  -d XXXXX)"
    cp /etc/nginx/nginx.conf "$tempdir/nginx.conf"
    echo "View the failed configuration file here: $tempdir/nginx.conf" >&2

    cp /etc/nginx/nginx.conf{.bak,}
    exit 1
fi
