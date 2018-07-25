FROM nginx:1.11.8-alpine

MAINTAINER Matt Strom [matt@mattstrom.com]

COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d /etc/nginx/conf.d

RUN mkdir -p /var/www

RUN \
	addgroup www-data -S && \
	adduser -S -s /sbin/nologin -g www-data -h /var/www -G www-data www-data

# SSL Support
# RUN \
# 	apt-get update && \
# 	apt-get --yes install certbot && \
# 	certbot --webroot -w /var/www -d home.mattstrom.com

#1
# admin@mattstrom.com
# A
# mattstrom.com
# 1
# /var/www

EXPOSE 80 443
