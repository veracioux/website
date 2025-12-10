# -*- mode: dockerfile; -*- vim: filetype=dockerfile

FROM docker.veracioux.me/frontend as frontend

FROM alpine:3.23

RUN apk add --no-cache nginx

#  ------------
## The rest...
#  ------------

WORKDIR /app
COPY . /app

COPY --from=frontend /frontend/dist /app/frontend/dist
CMD ["nginx", "-g", "daemon off;"]
