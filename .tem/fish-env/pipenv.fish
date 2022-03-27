# Produce the same effects in the environment as 'pipenv run' would
set -e PIPENV_ACTIVE
set -l _path (pipenv run env | grep "^PATH=" | sed 's/^PATH=//')
export PATH="$_path"
set -gx PIPENV_ACTIVE 1
