FROM node:18
# с alpine образом почему-то крашится приложение при попытке зарегать пользователя.

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY ./prisma ./


RUN yarn install
RUN yarn add @prisma/client

RUN npx prisma generate

COPY . .

EXPOSE 8080/tcp
EXPOSE 8080/udp
CMD ["yarn", "start:docker"]