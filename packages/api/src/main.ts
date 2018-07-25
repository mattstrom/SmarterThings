import './polyfills';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const options = new DocumentBuilder()
		.setTitle('SmarterThings')
		.setDescription('SmarterThings API description')
		.setVersion('1.0')
		.addTag('smartthings')
		.build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('api', app, document);

	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Accept', 'Authorization', 'Content-Type']
	});

	await app.listen(4567);
}

bootstrap();
