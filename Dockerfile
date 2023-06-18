FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080/tcp

EXPOSE 8080/udp

CMD ["yarn", "start:docker"]