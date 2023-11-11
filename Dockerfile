FROM node:18.15.0

WORKDIR ETIHADSTADIUM-BE

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["nodemon", "--inspect", "index.js"]
