# Backend Dockerfile
FROM node:18.17.1-slim as base
LABEL maintainer="hello@beerjoa.dev"
LABEL build_date="2023-09-02"

RUN mkdir -p /data/app && \
    chown -R node:node /data/app

WORKDIR /data/app

COPY package.json package-lock.json ./

USER node

RUN npm ci

COPY --chown=node:node . .

# Production
FROM base as production

RUN npm run build
