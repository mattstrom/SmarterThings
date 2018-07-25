FROM node:10.5.0 AS build

MAINTAINER Matt Strom [matt@mattstrom.com]

ARG SMARTTHINGS_CLIENT_ID
ARG SMARTTHINGS_CLIENT_SECRET

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /build && cp -a /tmp/node_modules /build

WORKDIR /build
ADD . /build

RUN \
	npm install && \
	npm run build && \
	npm config set clientId ${SMARTTHINGS_CLIENT_ID} && \
	npm config set clientSecret ${SMARTTHINGS_CLIENT_SECRET}


FROM node:10.5.0-alpine

COPY --from=build /build/dist ./dist
COPY --from=build /build/node_modules ./node_modules

ENV TYPEORM_HOST=mongodb

EXPOSE 4567

CMD ["node", "dist/main.js"]
