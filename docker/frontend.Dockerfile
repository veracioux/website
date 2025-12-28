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

WORKDIR /website

## Install local frontend dependencies
COPY package.json bun.lock ./
COPY frontend/package.json frontend/
COPY frontend/gimmicks/ascii-mugshot/package.json frontend/gimmicks/ascii-mugshot/
COPY cli/package.json cli/
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile --prod

COPY frontend frontend

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /website/frontend

## Bundle frontend
RUN --mount=type=cache,target=/root/.bun \
    env FORCE_COLOR=3 bun run generate

FROM oven/bun:1.3.1-slim

WORKDIR /website/frontend
COPY --from=build /website/frontend/dist /website/frontend/dist
ENTRYPOINT ["env"]
CMD ["echo", "INFO: The frontend image serves only as a base image; when run as a container, it does nothing. Exiting..."]
