import { Module } from '@nestjs/common';

import { EndpointUrl, OauthModuleOptions, RedirectUrl, SecretKey, ServerId } from '../../types';
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
		{ provide: EndpointUrl, useValue: process.env.ENDPOINT_URL },
		{ provide: RedirectUrl, useValue: `${process.env.API_URL}/oauth/callback` },
		{ provide: SecretKey, useValue: process.env.JWT_SECRET },
		{ provide: ServerId, useValue: process.env.SERVER_ID },
		{
			provide: JwtStrategy,
			inject: [AuthService, SecretKey],
			useFactory: (authService, secretKey) => new JwtStrategy(authService, secretKey)
		},
		{
			provide: OauthModuleOptions,
			useValue: {
				client: {
					id: process.env.SMARTTHINGS_CLIENT_ID,
					secret: process.env.SMARTTHINGS_CLIENT_SECRET
				},
				auth: {
					tokenHost: process.env.SMARTTHINGS_TOKEN_HOST
				}
			}
		}
	]
})
export class AuthModule {}
