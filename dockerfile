FROM node:9.4.0-alpine as client 
WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN npm install -qyCOPY client/ ./
RUN npm run build