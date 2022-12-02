#!/usr/bin/env sh

[ -z "$ENVIRONMENT" ] && export ENVIRONMENT=prod

echo "Running production API server on port $BACKEND_PORT"

set -e
db_timeout=180
if [ "$ENVIRONMENT" = "dev" ]; then
    db_timeout=15
fi
scripts/wait-for-it.sh -h db -p "$DB_PORT" -t "$db_timeout"

python3 manage.py collectstatic --noinput
python3 manage.py migrate

if [ "$ENVIRONMENT" != "prod" ]; then
    set +e
    python3 manage.py createsuperuser --noinput 2>&1 | sed 's/Error/Info/g' >&2
    set -e
fi

python3 manage.py loaddata projects.json


if [ "$ENVIRONMENT" = "dev" ]; then
    python3 manage.py runserver "$BACKEND_HOST:$BACKEND_PORT"
else
    uvicorn asgi:application --host $BACKEND_HOST --port $BACKEND_PORT
fi
