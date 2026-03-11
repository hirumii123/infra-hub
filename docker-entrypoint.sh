#!/usr/bin/env sh

set -e

echo "Installing prisma"
bun a prisma @prisma/config
bunx prisma migrate deploy

echo "Cleaning up"
rm -rf ~/.bun/install/cache

echo "Setting up cron"
# Jalankan /api/cron setiap menit
echo "* * * * * wget -q -O- http://localhost:3000/api/cron >> /var/log/cron.log 2>&1" | crontab -
crond -b -l 8

echo "Starting app"
bun server.js
