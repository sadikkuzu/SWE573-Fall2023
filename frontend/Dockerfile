FROM node:20-buster-slim

LABEL maintainer="SADIK KUZU <sadik.kuzu@boun.edu.tr>"

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
