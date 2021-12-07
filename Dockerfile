FROM alpine:3.14.3

# Install global python dependencies
RUN apk add --no-cache python3 py3-pip npm
RUN apk add --no-cache nginx
RUN pip install --no-cache-dir pipenv

WORKDIR /app/frontend

# Install npm dependencies
COPY frontend .
RUN npm ci --only=prod

# Bundle frontend
RUN npm run build

WORKDIR /app
COPY . .

# Set up virtual env
RUN LANG=en_US.UTF-8 pipenv sync

# Collect static files
RUN pipenv run python manage.py collectstatic

# Run migrations
RUN pipenv run python manage.py makemigrations
RUN pipenv run python manage.py migrate

COPY nginx.conf /etc/nginx/nginx.conf

ENV VERACIOUX_PRODUCTION=true
ENV PORT 80

CMD sed -i 's/$PORT'/"$PORT"'/g' /etc/nginx/nginx.conf && ./production.sh
