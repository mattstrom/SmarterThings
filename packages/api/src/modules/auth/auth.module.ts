import { Module } from '@nestjs/common';

import config from '../../configuration';
import { OauthModuleOptions } from '../../types';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { OauthController } from './oauth.controller';


@Module({
	controllers: [
		AuthController,
		OauthController
	],
	providers: [
		AuthService,
		{
			provide: JwtStrategy,
			inject: [AuthService],
			useFactory: (authService) => new JwtStrategy(authService)
		},
		{
			provide: OauthModuleOptions,
			useValue: {
				client: {
					id: config.smartthings.clientId,
					secret: config.smartthings.clientSecret
				},
				auth: {
					tokenHost: config.smartthings.tokenHost
				}
			}
		}
	]
})
export class AuthModule {}
