#!/usr/bin/env bash

# Usage: worker_dotfiles.sh <http_method> <git-ref>

method="$1"
gitref="$2"

set -e

conf() {
    git --work-tree="$HOME" --git-dir="$HOME/.cfg" "$@"
}

curl() {
    command curl --fail-with-body \
        -H "authorization: Bearer $DROPBOX_WORKER_OAUTH2_TOKEN" \
        "$@"
}

# Usage: upload <file> <path>
upload() {
    local destination output
    destination="/dotfiles/$gitsha/$1"

    output="$(
        curl https://content.dropboxapi.com/2/files/upload \
            -H "content-type: application/octet-stream" \
            -H "Dropbox-API-Arg: {\"path\":\"$2\"}" \
            --data-binary "$1" 2>/dev/null
    )"
    if [ "$?" != 0 ]; then echo "$output"; fi
}


cd /home/user

conf init
conf remote add origin "https://github.com/veracioux/dotfiles" | true
conf fetch origin "$gitref" --depth 1
conf checkout --force FETCH_HEAD

gitsha="$(conf rev-parse HEAD)"

conf clean -dfx

./.haris-bin/tangle
cd /tmp/.tangle-home

readarray -t files < <(find -type f)

echo "Deleting previous contents of /dotfiles/$gitsha on dropbox..."
curl https://api.dropboxapi.com/2/files/delete_v2 \
    -H "content-type: application/json" \
    -d "{\"path\": \"/dotfiles/$gitsha\"}" || true

echo "Uploading to dropbox..."

for file in "${files[@]}"; do
    file="$(sed 's:^\./::' <<<"$file")"
    dest="/dotfiles/$gitsha/$file"
    echo "Uploading $file to dropbox at: $dest ..."
    upload "$file" "$dest"
done

echo "UPLOAD DONE."

