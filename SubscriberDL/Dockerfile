FROM mhart/alpine-node:latest
WORKDIR /app

COPY tsconfig.json package.json package-lock.json ./
RUN npm install
COPY src /app/src/
RUN NODE_ENV=production npx npm run build

FROM mhart/alpine-node:latest
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install --prod

FROM alpine:3.12.0
ENV NODE_ENV=production
COPY --from=1 /app/node_modules/ /app/node_modules/
COPY --from=1 /usr/bin/node /usr/bin/
COPY --from=1 /usr/lib/node_modules/ /usr/lib/node_modules/
COPY --from=1 /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/
WORKDIR /app
COPY --from=0 /app/dist/ ./dist/
COPY package.json /app/
CMD NODE_ENV=production node /app/dist
