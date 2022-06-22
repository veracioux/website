
# Environment variables

### ENVIRONMENT

The environment that the server is running in. Can be one of: `dev`, `local`,
`prod`. The meaning of `dev` and `prod` is obvious. `local` is a local server
that is meant to be as similar to `prod` as possible. It uses production's
server config (e.g. uses nginx, uses dropbox as storage backend etc.). You can
think of it as local staging.

# Ports

**5432**: postgres

**3000**: frontend

**8000**: web app

**5000**: nginx

# Available commands

- Deploy locally: `up`
- Force remove all containers locally: `drm`
- Deploy to heroku: `deploy`

# Some things that should be kept in mind

- For greater maintainability and migratability, all ports are not hardcoded in
    files (where possible). Instead they are taken from the environment. The
    most notable example is `nginx.conf` where variables are baked into the
    target file using `envsubst`. To avoid conflicts with nginx's own variables,
    the `envsubst` command is called with the relevant environment variables
    explicitly specified. So, if you want to add a new variable in `nginx.conf`,
    you will have to specify the variable inside `scripts/production.sh` where
    the `envsubst` command is invoked.
