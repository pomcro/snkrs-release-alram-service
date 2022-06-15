FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .
COPY plugin.js ./node_modules/@nuxtjs/svg-sprite/lib/plugin.js

RUN npm run build
ENV HOST 0.0.0.0
EXPOSE 8080
USER node
CMD ["npm","start"]
