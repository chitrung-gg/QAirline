FROM node:24-alpine3.20
WORKDIR /app

COPY ./package*.json .
RUN npm install -g pnpm \ 
    && pnpm install

COPY . .
EXPOSE 5000
CMD [ "pnpm", "run", "start" ]