From node:slim

WORKDIR /app

COPY . /app

RUN npm install

RUN ls

EXPOSE 8080

CMD node index.js
