FROM node:20 as build

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3002

CMD ["npm", "start"]
