# -*- mode: dockerfile; -*- vim: filetype=dockerfile

FROM oven/bun:1.3.1-alpine AS bun-base

## Install deps for "canvas" node package
RUN apk add --no-cache \
    curl \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    giflib-dev \
    pango-dev

## Install Chromium for Puppeteer
RUN apk add --no-cache chromium

RUN --mount=type=cache,target=/root/.bun \
    bun install -g node-gyp puppeteer@^19

WORKDIR /frontend

FROM bun-base AS build
## Install local frontend dependencies
COPY package.json bun.lock ./
COPY package.json bun.lock ./
COPY gimmicks/ascii-mugshot/package.json gimmicks/ascii-mugshot/
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile --prod

COPY . .

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

## Bundle frontend
RUN --mount=type=cache,target=/root/.bun \
    bun run generate

# Minify SVG icons and copy them to static root
# TODO: integrate into "bun run generate" or as a vite plugin
RUN bun svgo -f src/assets/icons -o dist/static/icons

FROM oven/bun:1.3.1-alpine AS prod-base

WORKDIR /frontend
COPY --from=build /frontend/dist /frontend/dist
ENTRYPOINT ["env"]
CMD ["echo", "INFO: The frontend image serves only as a base image; when run as a container, it does nothing. Exiting..."]
