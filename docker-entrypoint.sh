#!/usr/bin/env sh

set -e

echo "Installing prisma"
bun a prisma @prisma/config
bunx prisma migrate deploy

echo "Cleaning up"
rm -rf ~/.bun/install/cache

bun server.js
