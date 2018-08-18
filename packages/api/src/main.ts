require('dotenv').config(); // tslint:disable-line:no-var-requires

import './polyfills';
import * as terminus from '@godaddy/terminus';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as responseTime from 'response-time';

import { AppModule } from './app.module';
import { logger } from './modules/logging/winston';


let ready: boolean = false;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const options = new DocumentBuilder()
		.setTitle('SmarterThings')
		.setDescription('SmarterThings API description')
		.setVersion('1.0')
		.addTag('smartthings')
		.build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('docs', app, document);

	app.use(cookieParser());
	app.use(helmet());
	app.use(responseTime());

	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Accept', 'Authorization', 'Content-Type']
	});

	await app.listen(4567, () => {
		ready = true;
	});

	terminus(app.getHttpServer(), {
		signal: 'SIGINT',
		healthChecks: {
			'/health/liveness': async () => Promise.resolve(),
			'/health/readiness': async () => {
				return (ready) ? Promise.resolve(true) : Promise.reject(null);
			}
		},
		onSignal: async () => {
			logger.info('SIGINT received. Preparing to shutdown.');
		},
		onShutdown: async () => {
			logger.info('System shutdown.');
		}
	});
}

bootstrap();

process.on('unhandledRejection', (err: Error) => {
	logger.error(err.message);
	logger.error(err.stack);

	/* Process manager should restart. */
	process.exit(1);
});
