FROM alpine:latest

RUN \
apk add --no-cache \
nodejs npm chromium && \
apk add --no-cache --repository=http://dl-cdn.alpinelinux.org/alpine/edge/testing/ \
pnpm

ENV CHROMIUM_PATH=/usr/bin/chromium
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /app

ADD package.json pnpm-lock.yaml /app/
RUN pnpm install --frozen-lockfile
# && pnpm playwright install firefox

ADD . .
RUN pnpm build

CMD pnpm serve
