import { DynamicModule, Global, Module } from '@nestjs/common';
import * as morgan from 'morgan';

import { Logger, MorganProvider } from './tokens';
import { logger } from './winston';


export const providers = [
	{ provide: Logger, useValue: logger },
	{
		provide: MorganProvider,
		useFactory: (): morgan.Morgan => {
			return morgan
		}
	}
];

@Global()
@Module({
	exports: providers,
	providers: providers
})
export class LoggingModule {
	static forRoot(): DynamicModule {
		return {
			module: LoggingModule
		};
	}
}
