import { Container, interfaces } from 'inversify';
import { Db, MongoClient } from 'mongodb';
import * as Oauth2 from 'simple-oauth2';

import { AuthService } from '../services';
import TYPES from './types';

import Context = interfaces.Context;


const container = new Container();

//container.bind<string>(TYPES.TokenHost).toConstantValue('https://graph.api.smartthings.com');
container.bind<string>(TYPES.TokenHost).toConstantValue('https://graph-na04-useast2.api.smartthings.com');
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

container.bind<string>(TYPES.MongoConnectionUri).toConstantValue('mongodb://localhost:27017/smartthings');
container.bind<Promise<Db>>(TYPES.MongoDB).toDynamicValue((context: Context) => {
	const uri = context.container.get<string>(TYPES.MongoConnectionUri);
	return MongoClient.connect(uri);
})

export default container;
