#!/usr/bin/env sh

set -e

echo "Installing prisma"
bun a prisma @prisma/config
bunx prisma migrate deploy

echo "Cleaning up"
rm -rf ~/.bun/install/cache

echo "Setting up cron"
touch /var/log/cron.log
chmod 666 /var/log/cron.log
echo "* * * * * wget -q -O- http://localhost:3000/api/cron >> /var/log/cron.log 2>&1
" | crontab -

crond -b -l 8

echo "Starting app"
exec su-exec next bun server.js