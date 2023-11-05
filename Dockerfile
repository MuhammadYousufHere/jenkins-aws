FROM node:18.12.1-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install -g yarn

RUN yarn install

COPY . .

EXPOSE 8080

CMD [ "yarn","start" ]