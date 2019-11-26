FROM mhart/alpine-node:12
WORKDIR /app

COPY tsconfig.json package.json package-lock.json ./
RUN npm install
COPY src /app/src/
RUN NODE_ENV=production npm run build

FROM mhart/alpine-node:12
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install --prod
COPY --from=0 /app/dist/ ./dist/
CMD NODE_ENV=production node /app/dist
