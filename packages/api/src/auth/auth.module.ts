import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { OauthController } from './oauth.controller';
import { EndpointUrl, OauthModuleOptions, RedirectUrl, SecretKey, ServerId } from '../types';

@Module({
	controllers: [
		AuthController,
		OauthController
	],
	providers: [
		AuthService,
		{ provide: EndpointUrl, useValue: 'https://graph.api.smartthings.com/api/smartapps/endpoints' },
		{ provide: RedirectUrl, useValue: 'http://home.mattstrom.com/oauth/callback' },
		{ provide: SecretKey, useValue: 'secretKey' },
		{ provide: ServerId, useValue: 'http://localhost' },
		{
			provide: JwtStrategy,
			inject: [AuthService, SecretKey],
			useFactory: (authService, secretKey) => new JwtStrategy(authService, secretKey)
		},
		{
			provide: OauthModuleOptions,
			useValue: {
				client: {
					id: 'b92dcaae-8905-4982-a40f-fc15b6bcec37',
					secret: 'a14c2f34-300d-4956-b8c3-331716deab6d'
				},
				auth: {
					tokenHost: 'https://graph-na04-useast2.api.smartthings.com'
				}
			}
		}
	]
})
export class AuthModule {}
