#!/usr/bin/env sh

if [ "$ENVIRONMENT" = "dev" ]; then
    pnpm install --frozen-lockfile --no-verify-store-integrity --dir worker
fi

pnpm run server
