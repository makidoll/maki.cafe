FROM node:lts

WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn install && yarn playwright install-deps

ADD . .
RUN yarn build

CMD yarn serve
