FROM node:18.15.0-alpine

WORKDIR ETIHADSTADIUM-BE

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["nodemon", "--inspect", "index.js"]
