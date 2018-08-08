import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { SecuritySystemController, TriggerController } from './controllers';
import { AuthModule } from './modules/auth';
import { LoggingModule, MorganInterceptor } from './modules/logging';
import { EventsGateway } from './services';
import { ServerId, RedirectUrl, SmartThingsAppUrl } from './types';


@Module({
	controllers: [
		AppController,
		SecuritySystemController,
		TriggerController
	],
	imports: [
		AuthModule,
		LoggingModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'mongodb',
			host: process.env.TYPEORM_HOST || 'localhost',
			port: 27017,
			database: 'smarterthings',
			entities: [
				__dirname + '/entities/**/*.entity{.ts,.js}',
			],
			synchronize: true
		} as any)
	],
	providers: [
		EventsGateway,
		{ provide: RedirectUrl, useValue: process.env.REDIRECT_URL },
		{ provide: ServerId, useValue: process.env.SERVER_ID },
		{
			provide: SmartThingsAppUrl,
			useValue: process.env.SMARTTHINGS_TOKEN_HOST
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: MorganInterceptor,
		}
	]
})
export class AppModule { }
