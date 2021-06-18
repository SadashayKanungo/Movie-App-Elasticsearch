FROM node:14.5.0
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
EXPOSE 3000
EXPOSE 9200
CMD npm run start