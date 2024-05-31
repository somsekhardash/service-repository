FROM node:20
WORKDIR /app
COPY package*.json /
RUN npm ci
ADD . .
EXPOSE 5050
RUN npm run db:generate 
RUN npm run build

CMD [ "npm", "start" ]