import { createTerminus } from '@godaddy/terminus';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import responseTime from 'response-time';

import config from './configuration';
import { AppModule } from './app.module';
import { logger } from './modules/logging/winston';
import { ReplModule } from './services/repl.module';
import { ReplServer } from './services/repl-server.service';


declare const module: any;

const port: number = (config.port) || 4567;
let ready: boolean = false;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.use(cookieParser());
	app.use(helmet());
	app.use(responseTime());

	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Accept', 'Authorization', 'Content-Type']
	});

	await app.listen(port, () => {
		ready = true;
	});

	const repl = await NestFactory.createMicroservice(ReplModule, {
		strategy: new ReplServer({
			context: app
		}),
		logger: new Logger()
	});

	repl.listen(() => {});

	createTerminus(app.getHttpServer(), {
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

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}

bootstrap();

process.on('unhandledRejection', (err: Error) => {
	logger.error(err.message);
	logger.error(err.stack);

	/* Process manager should restart. */
	process.exit(1);
});
