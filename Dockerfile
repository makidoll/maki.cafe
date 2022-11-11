FROM node:lts

WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn install

ADD . .
RUN yarn build

CMD yarn serve