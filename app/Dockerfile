FROM node:21-alpine3.18 as build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/dist /var/www/html/
COPY --from=build /app/nginx/default /etc/nginx/sites-available/default
EXPOSE 80
CMD ["nginx","-g","daemon off;"]