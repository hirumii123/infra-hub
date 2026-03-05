FROM oven/bun:1-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
COPY ./prisma/ ./prisma
COPY ./prisma.config.ts ./
RUN bun i --no-save --ignore-scripts

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
ENV NEXT_TELEMETRY_DISABLED=1

RUN bun --bun prisma generate && bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S next && adduser -u 1001 -G next -S next

COPY --from=builder --chown=next:next /app/public ./public
COPY --from=builder --chown=next:next /app/.next/standalone ./
COPY --from=builder --chown=next:next /app/.next/static ./.next/static

COPY --from=builder --chown=next:next /app/prisma ./prisma
COPY --from=builder --chown=next:next /app/prisma.config.ts ./

COPY --chown=next:next --chmod=700 ./docker-entrypoint.sh ./

RUN chown -R next:next /app

USER next
EXPOSE 3000
ENV PORT=3000 \
    HOSTNAME="0.0.0.0"

CMD ["./docker-entrypoint.sh"]
