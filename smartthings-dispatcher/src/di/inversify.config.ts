import { Container, interfaces } from 'inversify';
import * as Oauth2 from 'simple-oauth2';

import { AuthService } from '../services';
import TYPES from './types';

import Context = interfaces.Context;


const container = new Container();

container.bind<string>(TYPES.TokenHost).toConstantValue('https://graph.api.smartthings.com');
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<Oauth2.ModuleOptions>(TYPES.OAuthModuleOptions).toDynamicValue((context: Context) => {
	return {
		client: {
			id: context.container.get<string>(TYPES.ClientId),
			secret: context.container.get<string>(TYPES.ClientSecret)
		},
		auth: {
			tokenHost: context.container.get<string>(TYPES.TokenHost)
		}
	};
});

export default container;
