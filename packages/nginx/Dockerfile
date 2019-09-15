FROM nginx:1.11.8-alpine

MAINTAINER Matt Strom [matt@mattstrom.com]

COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d /etc/nginx/conf.d

RUN mkdir -p /var/www

RUN \
	addgroup www-data -S && \
	adduser -S -s /sbin/nologin -g www-data -h /var/www -G www-data www-data

EXPOSE 80 443
