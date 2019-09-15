import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { SecuritySystemController, TriggerController } from './controllers';
import { DatabaseModule } from './modules';
import { AuthModule } from './modules/auth';
import { LoggingModule } from './modules/logging';
import { EventsGateway } from './services';


@Module({
	controllers: [
		AppController,
		SecuritySystemController,
		TriggerController
	],
	imports: [
		AuthModule,
		DatabaseModule,
		LoggingModule.forRoot()
	],
	providers: [
		EventsGateway
	]
})
export class AppModule { }
