import { Container, interfaces } from 'inversify';
import { Db, MongoClient } from 'mongodb';
import * as mongoose from 'mongoose';
import * as Oauth2 from 'simple-oauth2';

import { AuthModule } from '../services/auth/auth.module';
import TYPES from './types';

import Context = interfaces.Context;
import MongooseThenable = mongoose.MongooseThenable;


const container = new Container();

container.bind<string>(TYPES.Secret).toConstantValue('secret');
container.bind<string>(TYPES.RedirectUrl).toConstantValue('/keypad');
container.bind<string>(TYPES.TokenHost).toConstantValue('https://graph-na04-useast2.api.smartthings.com');
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

container.load(AuthModule);

container.bind<string>(TYPES.MongoConnectionUri).toConstantValue('mongodb://localhost:27017/smartthings');
container.bind<Promise<Db>>(TYPES.MongoDB).toDynamicValue((context: Context) => {
	const uri = context.container.get<string>(TYPES.MongoConnectionUri);
	(<any>mongoose).Promise = global.Promise;

	return MongoClient.connect(uri);
});
container.bind<MongooseThenable>(TYPES.Mongoose).toDynamicValue((context: Context) => {
	const uri = context.container.get<string>(TYPES.MongoConnectionUri);

	(<any> mongoose).Promise = global.Promise;
	const connection = mongoose.connect(uri, { useMongoClient: true });

	return connection;
}).inSingletonScope();

export default container;
