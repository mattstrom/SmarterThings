FROM node:10.5.0 AS build

MAINTAINER Matt Strom [matt@mattstrom.com]

RUN \
	npm install --global local-web-server

ADD package.json /tmp/package.json
RUN mkdir -p /build && cd /tmp && npm install
RUN mkdir -p /build && cp -a /tmp/node_modules /build

WORKDIR /build
ADD . /build

RUN \
	npm install && \
	npm run build -- --configuration=production


FROM node:10.5.0-alpine

COPY --from=build /build/dist .

RUN npm install --global local-web-server

EXPOSE 4200

CMD ["ws", "--port", "4200", "--spa", "index.html", "--directory", "ui"]
