
# Environment variables

### ENVIRONMENT

The environment that the server is running in. Can be one of: `dev`, `staging`,
`prod`. The meaning of these should be obvious. The `dev` environment exposes
ports of all containers to the host and it enables hot reloading. It uses a
local (ephemeral) database and the local filesystem where applicable. The
`staging` environment is meant to be as similar to `prod` as possible, using a
persistent database, a dropbox account for storage of some files, etc. Obviously,
it doesn't use the same accounts and API keys. `dev` and `staging` can be
deployed locally. `staging` can also be served on a dedicated server. It is
password protected regardless of whether it is served locally or on a server.
The password is saved in the browser via cookie so you don't have to enter it
every time.

# Ports

**3000**: main web port

**5432**: postgres database

**8000**: backend app

# Available commands

- Deploy locally: `up`
- Force remove all containers locally: `down`
- Serve production server: `serve`
  This command should be run on a VPS.
- Manage local secrets: `lpass` - a wrapper around GNU `pass`
- Upload local secrets to the server: `upload-secrets`

# Some things that should be kept in mind

- For greater maintainability and migratability, ports are not hardcoded in
    files (where possible). Instead they are taken from the environment. The
    most notable example is `nginx.conf` where variables are baked into the
    target file using `envsubst`. To avoid conflicts with nginx's own variables,
    the `envsubst` command is called with the relevant environment variables
    explicitly specified as arguments. So, if you want to add a new variable in
    `nginx.conf`, you will have to specify the variable inside
    `scripts/entrypoint-prod.sh` where the `envsubst` command is invoked.

# Static assets

Static assets are collected by the django `manage.py` script into
`/var/static_root`, because that's the easiest way (django provides the
`collectstatic` command).

# Serving files temporarily

To create a temporary endpoint for serving a file, just put a file (for example
one named `myfile`) inside the `~/tmp_root` directory. The file will be
available at a URL subpath that corresponds to the path of the file relative to
`~/tmp_root` (in our example that is `/myfile`). Note that `index.html` behave
as usual, i.e. `~/tmp_root/myfile/index.html` will be available at `/myfile` and
`/myfile/`.
