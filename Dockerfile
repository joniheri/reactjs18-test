FROM node:20-alpine

WORKDIR /app-fe

COPY package*.json .
RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]