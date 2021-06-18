FROM node:14.5.0
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . .
EXPOSE 3000
EXPOSE 9200