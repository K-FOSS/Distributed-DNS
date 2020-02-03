FROM docker.pkg.github.com/kristianfjones/docker-images/node-alpine:latest
WORKDIR /app
COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./
RUN npm ci
COPY src ./src/
RUN NODE_ENV=production npm run build

FROM docker.pkg.github.com/kristianfjones/docker-images/node-alpine:latest
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --prod

FROM astefanutti/scratch-node
ENV NODE_ENV=production
COPY --from=1 /app/node_modules/ /app/node_modules/
WORKDIR /app
COPY --from=0 /app/dist/ ./dist/
COPY package.json /app/
CMD NODE_ENV=production node /app/dist/index.js
