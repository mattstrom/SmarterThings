FROM node:12.10.0-alpine AS build

MAINTAINER Matt Strom [matt@mattstrom.com]

RUN mkdir -p /build
WORKDIR /build

ADD package.json .
ADD package-lock.json .
RUN npm ci --production=false

ADD . /build

RUN \
	npm ci --production=false && \
	npm run build -- --configuration=production


FROM linuxserver/nginx:arm32v7-latest

RUN rm /etc/nginx/modules/http_lua*

WORKDIR /config
COPY --from=build /build/support/nginx .

WORKDIR /config/www
COPY --from=build /build/dist/ui .

EXPOSE 80
