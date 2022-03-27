#!/usr/bin/env sh

cd frontend
pnpm run serve &
cd ..

# Wait for database
./wait-for-it.sh -h db -p 5432 -t 15

python3 manage.py migrate
python3 manage.py loaddata projects.json
python3 manage.py collectstatic --noinput

python3 manage.py runserver 0.0.0.0:8000
