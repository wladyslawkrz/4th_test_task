FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

COPY ./dist ./dist

EXPOSE 8080/tcp

EXPOSE 8080/udp

CMD ["yarn", "start:dev"]