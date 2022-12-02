#!/usr/bin/env sh

[ -z "$ENVIRONMENT" ] && export ENVIRONMENT=dev

set -e

# TODO: move this comment to narrative documentation
# Because the project root directory on the host is being shared with the
# container as a volume, we have to re-populate the node_modules directories at
# runtime. This is a cheap operation since the modules have already been
# installed during docker build, so pnpm wll simply create hardlinks to them.
rm -rf /app/frontend/node_modules
pnpm install --shamefully-hoist --frozen-lockfile --no-verify-store-integrity --dir frontend

pnpm --dir frontend run dev &
