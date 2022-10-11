FROM node:latest
WORKDIR /usr/app
COPY . /usr/app
RUN npm install express --save
RUN npm install dd-trace --save
RUN npm install winston --save
CMD [ "node", "server.js" ]
