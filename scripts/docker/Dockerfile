# stage 1
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --omit=dev

# stage 2
FROM nginx:alpine

COPY --from=build /app/dist/smart-mirror/browser /usr/share/nginx/html
COPY --from=build /app/dist/smart-mirror/browser/assets/env.template.js /usr/share/nginx/html/assets/env.template.js

EXPOSE 80

CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
