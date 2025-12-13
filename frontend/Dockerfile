# -*- mode: dockerfile; -*- vim: filetype=dockerfile

FROM oven/bun:1.3.1-slim AS build

RUN apt-get update -y

RUN apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    g++ \
    libcairo2-dev \
    libjpeg-dev \
    libgif-dev \
    libpango1.0-dev \
    chromium

RUN --mount=type=cache,target=/root/.bun \
    bun install -g node-gyp puppeteer@^19

WORKDIR /frontend

## Install local frontend dependencies
COPY package.json bun.lock ./
COPY gimmicks/ascii-mugshot/package.json gimmicks/ascii-mugshot/
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile --prod

COPY . .

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

## Bundle frontend
RUN --mount=type=cache,target=/root/.bun \
    env FORCE_COLOR=3 bun run generate

# Minify SVG icons and copy them to static root
# TODO: integrate into "bun run generate" or as a vite plugin
RUN bun svgo -f src/assets/icons -o dist/static/icons

FROM oven/bun:1.3.1-slim

WORKDIR /frontend
COPY --from=build /frontend/dist /frontend/dist
ENTRYPOINT ["env"]
CMD ["echo", "INFO: The frontend image serves only as a base image; when run as a container, it does nothing. Exiting..."]
