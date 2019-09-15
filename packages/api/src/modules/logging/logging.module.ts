import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import morgan, { Morgan } from 'morgan';
import { EventsGateway } from '../../services';
import { MorganInterceptor } from './morgan.interceptor';

import { Logger as LoggerToken, MorganProvider, NestLogger } from './tokens';
import { logger } from './winston';


export const providers = [
	{ provide: LoggerToken, useValue: logger },
	{ provide: NestLogger, useValue: new Logger() },
	{
		provide: MorganProvider,
		useFactory: (): Morgan => {
			return morgan;
		}
	}
];

@Global()
@Module({
	exports: providers,
	providers: [
		...providers,
		{
			provide: APP_INTERCEPTOR,
			useClass: MorganInterceptor,
		}
	]
})
export class LoggingModule {
	static forRoot(): DynamicModule {
		return {
			module: LoggingModule
		};
	}
}
