FROM node:14.1.0-alpine3.11 AS build

WORKDIR /build

ADD . .

RUN mkdir -p dist \
    && npm install \
    && npm run build

FROM nginx:1.18.0-alpine

COPY --from=build /build/dist/ /usr/share/nginx/html/
