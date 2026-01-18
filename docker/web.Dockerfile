FROM oven/bun:1.3.5-slim AS fe-build
ARG IS_STAGING="false"

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
# Ensure all workspace projects can be resolved
COPY cli/package.json cli/
COPY lib/package.json lib/
COPY chat/fe/package.json chat/fe/
COPY chat/api/package.json chat/api/
COPY chat/lib/package.json chat/lib/
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile --prod \
    --filter='!./cli' --filter='!./chat/lib' --filter='!./chat/api' --filter='!./chat/fe'

COPY frontend frontend

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /website/frontend

## Bundle frontend
RUN --mount=type=cache,target=/root/.bun \
    env FORCE_COLOR=3 bun run generate

FROM alpine:3.23

RUN apk add --no-cache nginx

WORKDIR /website
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=fe-build /website/frontend/dist /website/frontend/dist
CMD ["nginx", "-g", "daemon off;"]
