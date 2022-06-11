#!/usr/bin/env sh

# Because the frontend directory on the host is being shared with the container
# as a volume, we have to re-populate the node_modules directory at runtime.
# This is a cheap operation since the modules have already been installed during
# docker build.
pnpm install --frozen-lockfile --no-verify-store-integrity --dir frontend

pnpm --dir frontend run dev --host &

# Wait for database
scripts/wait-for-it.sh -h db -p "$DB_PORT" -t 15

pnpm run --dir worker/ server &

python3 manage.py collectstatic --noinput
python3 manage.py migrate
python3 manage.py loaddata projects.json

python3 manage.py runserver 0.0.0.0:$DJANGO_PORT
