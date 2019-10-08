FROM mhart/alpine-node:latest
WORKDIR /app
COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./
RUN npm ci
COPY src ./src/
RUN NODE_ENV=production npm run build

FROM mhart/alpine-node:latest
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --prod

FROM alpine:3.10
ENV NODE_ENV=production
COPY --from=1 /app/node_modules/ /app/node_modules/
COPY --from=1 /usr/bin/node /usr/bin/
COPY --from=1 /usr/lib/node_modules/ /usr/lib/node_modules/
COPY --from=1 /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/
WORKDIR /app
COPY --from=0 /app/dist/ ./dist/
COPY package.json /app/
CMD NODE_ENV=production node /app/dist/index.js
