#!/usr/bin/env bash

# Pull all website-related images from the locally running registry

if [ "$ENVIRONMENT" = "staging" ]; then
    tag="staging"
else
    tag="latest"
fi

for image in {web,worker_dotfiles,mail}:"$tag"; do
    echo "Pulling image localhost:5000/$image from local registry into daemon..."
    docker pull localhost:5000/"$image"
    echo "Re-tagging image as docker.veracioux.me/$image"
    docker tag localhost:5000/"$image" docker.veracioux.me/"$image"
done

