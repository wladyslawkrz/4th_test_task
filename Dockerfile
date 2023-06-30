FROM node:18 as builder
# с alpine образом почему-то крашится приложение при попытке зарегать пользователя.

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./prisma ./


RUN yarn install
RUN npx prisma generate

COPY . .

RUN yarn build

FROM node:18

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 8080
CMD ["yarn", "start:docker"]