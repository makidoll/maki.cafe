FROM rockylinux:9

RUN dnf install -y nodejs gtk3 dbus-glib && npm i -g yarn

WORKDIR /app

ADD package.json yarn.lock /app/
# RUN yarn install && yarn playwright install-deps firefox
RUN yarn install

ADD . .
RUN yarn build

CMD yarn serve
