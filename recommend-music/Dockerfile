FROM node:18.12.1-alpine
WORKDIR /usr/src/app
COPY package.json .
ENV PATH /recommend-music/node_modules/.bin:$PATH

RUN npm install
RUN npm install react-scripts

