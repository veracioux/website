#!/usr/bin/env sh

set -e

pnpm install --shamefully-hoist --frozen-lockfile

pnpm run dev:container
