FROM docker.veracioux.me/frontend AS frontend

FROM alpine:3.23

RUN apk add --no-cache nginx

WORKDIR /website
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=frontend /website/frontend/dist /website/frontend/dist
CMD ["nginx", "-g", "daemon off;"]
