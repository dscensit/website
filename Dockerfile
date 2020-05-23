# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /public /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]