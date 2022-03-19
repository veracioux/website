FROM alpine:3.15.0

# Install global python dependencies
RUN apk add --no-cache python3 python3-dev py3-pip npm
RUN apk add --no-cache nginx
# Dependencies for psycopg2
RUN apk add --no-cache postgresql-dev libpq gcc musl-dev
RUN pip install --no-cache-dir pipenv

# Required by 'heroku ps:exec'
RUN apk add --no-cache bash
RUN ln -sf /bin/bash /bin/sh

WORKDIR /app/frontend

# Install npm dependencies
RUN mkdir -p frontend/
COPY package.json package-lock.json frontend/
RUN npm install --only=prod

# Bundle frontend
RUN npm run build

WORKDIR /app
COPY . .

# Set up virtual env
RUN LANG=en_US.UTF-8 pipenv sync
# Install the virtual env globally, so it persists in the heroku filesystem
RUN pipenv run pip freeze > /requirements.txt
RUN pip install --no-cache-dir -r /requirements.txt

# Collect static files
RUN python3 manage.py collectstatic

# Run migrations
RUN python3 manage.py makemigrations

COPY nginx.conf /etc/nginx/nginx.conf

# Port to serve nginx
ENV PORT 8001

CMD sed -i 's/$PORT'/"$PORT"'/g' /etc/nginx/nginx.conf && ./runserver.sh
