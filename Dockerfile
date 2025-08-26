FROM php:8.2-cli-alpine
WORKDIR /app
COPY . .
CMD php -S 0.0.0.0:${PORT:-8080} -t /app
