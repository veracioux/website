# -*- mode: dockerfile; -*- vim: filetype=dockerfile

FROM oven/bun:1.3-alpine AS bun-base

## Install deps for "canvas" node package
RUN apk add --no-cache \
    curl \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

WORKDIR /frontend

FROM bun-base AS build
## Install local frontend dependencies
COPY package.json bun.lock ./
COPY package.json bun.lock ./
COPY gimmicks/ascii-mugshot/package.json gimmicks/ascii-mugshot/
RUN bun install --frozen-lockfile --prod

COPY . .

## Bundle frontend
RUN bun run generate
# # Minify SVG icons and copy them to static root
# # TODO: integrate into "bun run generate" or as a vite plugin
# RUN bun svgo -f assets/icons -o dist/static/icons

# FROM oven/bun:1.3 AS prod-base
# COPY --from=build /frontend/dist/* /frontend/dist/
# CMD echo "INFO: The frontend image erves only as a base image; when run as a container, it does nothing. Exiting..."
