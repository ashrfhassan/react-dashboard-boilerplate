FROM ubuntu:latest as build-stage

WORKDIR /usr/service

RUN apt-get update -y && apt install wget -y && apt install xz-utils -y

RUN wget https://nodejs.org/download/release/v17.9.1/node-v17.9.1-linux-x64.tar.xz \
&& tar -xvf node-v17.9.1-linux-x64.tar.xz

RUN cp -r node-v17.9.1-linux-x64 /usr/

RUN apt-get update -y && apt-get install -y npm && apt-get install -y gnupg2

RUN npm install --global yarn

COPY . /usr/service

RUN yarn set version berry && yarn config set nodeLinker node-modules && yarn

ENV REACT_APP_ENVIRONMENT production
ENV REACT_APP_API_GATEWAY_URI localhost:8585
ENV SKIP_PREFLIGHT_CHECK true
ENV PATH="/usr/node-v17.9.1-linux-x64/bin:$PATH"
ENV NODE_PATH src/
ENV PORT 5000

RUN yarn run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /usr/service/build /usr/share/nginx/html

EXPOSE $PORT
