#!/usr/bin/env sh

pnpm run --dir frontend dev --host &

# Wait for database
scripts/wait-for-it.sh -h db -p "$DB_PORT" -t 15

pnpm run --dir worker/ server &

python3 manage.py collectstatic --noinput
python3 manage.py migrate
python3 manage.py loaddata projects.json

python3 manage.py runserver 0.0.0.0:$DJANGO_PORT
