FROM node:18.12.1-alpine
RUN npm install -g json-server

WORKDIR /data
COPY package.json .
RUN npm install 
EXPOSE 8080






