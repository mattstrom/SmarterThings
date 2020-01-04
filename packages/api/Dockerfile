FROM arm32v7/node:12.10.0-slim AS install

MAINTAINER Matt Strom [matt@mattstrom.com]

ARG NODE_ENV=production

RUN mkdir -p /build
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm ci --production=false


FROM arm32v7/node:12.10.0-alpine AS build

COPY --from=install /build /build

WORKDIR /build
ADD . /build

RUN npm run build


FROM arm32v7/node:12.10.0-alpine

RUN \
	mkdir -p /app && \
	mkdir -p /app/data

COPY --from=build /build/package.json /app/package.json
COPY --from=build /build/package-lock.json /app/package-lock.json
COPY --from=build /build/node_modules /app/node_modules
COPY --from=build /build/config /app/config
COPY --from=build /build/dist /app/dist

RUN touch /app/data/main.dat

WORKDIR /app

EXPOSE 4567
VOLUME /app/data

CMD ["node", "--experimental-repl-await", "dist/main.js"]
