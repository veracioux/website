#!/usr/bin/env sh

if [ -z "$PAT_1" ]; then
   echo "error: PAT_1 is not set" >&2
   exit 1
fi

bun run express.js
