FROM node:20 AS builder
WORKDIR /app

RUN npm npm install -g yarn
RUN yarn install
RUN yarn run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]