FROM node:12.10.0-alpine

MAINTAINER Matt Strom [matt@mattstrom.com]

ENV ACCESS_URL=""

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /build && cp -a /tmp/node_modules /build

WORKDIR /build
ADD . /build

RUN npm install

EXPOSE 3000

CMD ["npx", "serverless", "offline", "start"]
