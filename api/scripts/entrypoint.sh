#!/usr/bin/env sh

[ -z "$ENVIRONMENT" ] && export ENVIRONMENT=prod

echo "Running production API server on port $API_PORT"

set -e
db_timeout=180
if [ "$ENVIRONMENT" = "dev" ]; then
    db_timeout=15
fi
scripts/wait-for-it.sh -h db -p "$DB_PORT" -t "$db_timeout"

set +e
python3 manage.py collectstatic --noinput
if [ "$?" != "0" ]; then
    echo "TIP: Try removing the web_static docker volume..."
    exit 1
fi
set -e

python3 manage.py migrate

if [ "$ENVIRONMENT" != "prod" ]; then
    set +e
    python3 manage.py createsuperuser --noinput 2>&1 | sed 's/Error/Info/g' >&2
    set -e
fi

python3 manage.py loaddata projects.json


if [ "$ENVIRONMENT" = "dev" ]; then
    python3 manage.py runserver "$API_HOST:$API_PORT"
else
    uvicorn asgi:application --host $API_HOST --port $API_PORT
fi
