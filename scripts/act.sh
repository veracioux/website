#!/usr/bin/env bash

act \
    --secret VERACIOUX_DOCKER_PASSWORD="$(pass show docker.veracioux.me)" \
    --secret GCP_SA_KEY="$(pass show veracioux.me/stg-deployer-service-account)" \
    --secret VERACIOUX_SSL_CERT="$(pass show veracioux.me/server.crt)" \
    --secret VERACIOUX_SSL_KEY="$(pass show veracioux.me/server.key)" \
    --secret README_STATS_PAT="$(pass show github-readme-stats-pat)" \
    "$@"
