FROM arm32v7/node:12.10.0-slim AS install

MAINTAINER Matt Strom [matt@mattstrom.com]

ARG NODE_ENV=production

ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production=false
RUN mkdir -p /build && cp -a /tmp/node_modules /build


FROM arm32v7/node:12.10.0-slim AS build

COPY --from=install /build /build

WORKDIR /build
ADD . /build

RUN npm run build


FROM arm32v7/node:12.10.0-slim

COPY --from=build /build/dist ./dist
COPY --from=build /build/data ./data
COPY --from=build /build/environments ./environments
COPY --from=build /build/node_modules ./node_modules

EXPOSE 4567

CMD ["node", "--experimental-repl-await", "dist/main.js"]
