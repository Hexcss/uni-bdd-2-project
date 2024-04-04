FROM node:20-alpine as build

ARG AUTH_URL
ARG CRUD_URL
ARG IMAGE_URL
ARG SECRET_KEY

ENV VITE_AUTH_API_URL=$AUTH_URL \
    VITE_CRUD_API_URL=$CRUD_URL \
    VITE_IMAGE_API_URL=$IMAGE_URL \
    VITE_SECRET_KEY=$SECRET_KEY

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

FROM nginx:alpine as production

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
