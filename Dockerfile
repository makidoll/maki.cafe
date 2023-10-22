FROM node:lts
RUN corepack enable

WORKDIR /app

ADD package.json pnpm-lock.yaml /app/
RUN pnpm install --frozen-lockfile && pnpm playwright install firefox

ADD . .
RUN pnpm build

CMD pnpm serve
