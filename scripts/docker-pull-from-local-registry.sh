#!/usr/bin/env bash

# Pull all website-related images from the locally running registry

if [ "$ENVIRONMENT" = "staging" ]; then
    tag="staging"
else
    tag="latest"
fi

for image in {web,api,worker,worker_dotfiles,mail}:"$tag"; do
    echo "Pulling image docker.veracioux.me/$image from registry into daemon..."
    docker pull docker.veracioux.me/"$image"
done

