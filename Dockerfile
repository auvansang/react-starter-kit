FROM node:16-alpine AS build

# RUN apk add --no-cache \
#     autoconf \
#     automake \
#     file \
#     g++ \
#     libtool \
#     make \
#     nasm \
#     libpng-dev

WORKDIR /app
COPY src/Web/package.json .
COPY src/Web/.yarnrc.yml .
COPY src/Web/yarn.lock .
COPY src/Web/.yarn .
RUN yarn

COPY src/Web/apps .
COPY src/Web/components .
COPY src/Web/libs .
COPY src/Web/tools .
RUN yarn build:admin

FROM nginx:alpine AS runtime
EXPOSE 80

RUN apk add --no-cache bash

RUN rm -rf /etc/nginx/conf.d
COPY --from=build /app/nginx.conf /etc/nginx

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/admin /usr/share/nginx/html

CMD ["/bin/sh", "-c", "nginx -g 'daemon off;'"]
