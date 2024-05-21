# TODO: use alpine
FROM rockylinux:9

RUN dnf install -y nodejs gtk3 dbus-glib && npm i -g pnpm

WORKDIR /app

ADD package.json pnpm-lock.yaml /app/
RUN pnpm install --frozen-lockfile && pnpm playwright install firefox

ADD . .
RUN pnpm build

CMD pnpm serve
