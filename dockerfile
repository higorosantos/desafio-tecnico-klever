FROM node:20 as build

WORKDIR /app

COPY . .

RUN npm i 

RUN npm run build

CMD ["npm","run","start"]

 