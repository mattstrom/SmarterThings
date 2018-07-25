import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TriggerController } from './controllers/trigger.controller';
import { SecuritySystemController } from './controllers/security-system.controller';
import { EventsGateway } from './services/events.gateway';
import { ServerId, RedirectUrl, SmartThingsAppUrl } from './types';


@Module({
	controllers: [
		AppController,
		TriggerController,
		SecuritySystemController
	],
	imports: [
		AuthModule,
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
		{ provide: RedirectUrl, useValue: '/keypad' },
		{ provide: ServerId, useValue: 'http://localhost' },
		{
			provide: SmartThingsAppUrl,
			useValue: 'http://graph-na04-useast2.api.smartthings.com/api/smartapps/installations/e77e2118-d718-4738-b609-268b65c54f77'
		}
	]
})
export class AppModule { }
