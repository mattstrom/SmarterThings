FROM node:10.12.0 AS build

MAINTAINER Matt Strom [matt@mattstrom.com]

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /build && cp -a /tmp/node_modules /build

WORKDIR /build
ADD . /build

RUN \
	npm install && \
	npm run build


FROM node:10.12.0-alpine

COPY --from=build /build/dist ./dist
COPY --from=build /build/data ./data
COPY --from=build /build/node_modules ./node_modules

EXPOSE 4567

CMD ["node", "--experimental-repl-await", "dist/main.js"]
