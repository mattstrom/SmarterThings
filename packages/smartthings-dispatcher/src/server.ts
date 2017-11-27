import 'reflect-metadata';
import { interfaces } from 'inversify';
import { interfaces as expressInterfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as hbs from 'express-handlebars';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as path from 'path';
import * as program from 'commander';
import * as url from 'url';
import * as WebSocket from 'ws';

import container from './di/inversify.config';
import TYPES from './di/types';

import {
	SecuritySystemController,
	MainController,
	AuthController,
	FrontendController,
	//FrontendDevController,
	OAuthController,
	TriggerController,
	WildcardController
} from './controllers';
import { WebSocketService } from './services';
import { AuthService, AuthProvider } from './services/auth';


const ROOT = path.join(path.resolve(__dirname));

program.version('1.0.0')
	.usage('[options]')
	.option('-m, --mode <mode>', 'Server Mode', 'production')
	.option('--clientId <id>', 'Client ID')
	.option('--clientSecret <secret>', 'Client Secret')
	.parse(process.argv);

container.bind<string>(TYPES.Mode).toConstantValue(program['mode']);
container.bind<string>(TYPES.ClientId).toConstantValue(program['clientId']);
container.bind<string>(TYPES.ClientSecret).toConstantValue(program['clientSecret']);

container.bind<WebSocketService>(TYPES.WebSocketService).to(WebSocketService).inSingletonScope();

container.bind<expressInterfaces.Controller>(TYPE.Controller).to(MainController).whenTargetNamed('MainController');
container.bind<expressInterfaces.Controller>(TYPE.Controller).to(AuthController).whenTargetNamed('AuthController');
container.bind<expressInterfaces.Controller>(TYPE.Controller).to(OAuthController).whenTargetNamed('OAuthController');
container.bind<expressInterfaces.Controller>(TYPE.Controller).to(SecuritySystemController).whenTargetNamed('SecuritySystemController');
container.bind<expressInterfaces.Controller>(TYPE.Controller).to(TriggerController).whenTargetNamed('TriggerController');

if (program['mode'] === 'development') {
	//container.bind<expressInterfaces.Controller>(TYPE.Controller).to(FrontendDevController).whenTargetNamed('FrontendDevController');
} else {
	container.bind<expressInterfaces.Controller>(TYPE.Controller).to(FrontendController).whenTargetNamed('FrontendController');
}

container.bind<expressInterfaces.Controller>(TYPE.Controller).to(WildcardController).whenTargetNamed('WildcardController');

const server = new InversifyExpressServer(container, null, null, null, AuthProvider);

const instance = server
	.setConfig((app: express.Application) => {
		const options: ExphbsOptions = {
			defaultLayout: 'master',
			extname: 'hbs',
			layoutsDir: path.join(ROOT, 'views/layouts'),
			partialsDir: path.join(ROOT, 'views/partials')
		};

		app.engine('.hbs', hbs(options));
		app.set('view engine', '.hbs');
		app.set('views', path.join(ROOT, 'views'));

		app.use(bodyParser.urlencoded({
			extended: true
		}));

		app.use(bodyParser.json());
		app.use(cookieParser());

		app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type');

			next();
		});

		app.use(passport.initialize());
		app.use(passport.session());

		app.use('/lib/bootstrap', express.static(path.join(ROOT, '../node_modules/bootstrap/dist')));
		app.use('/public', express.static(path.join(ROOT, 'public')));
	})
	.build()
	.listen(4567);

container.bind<http.Server>(TYPES.WebServer).toConstantValue(instance);

const webSocketService = container.get<WebSocketService>(TYPES.WebSocketService);
webSocketService.initialize()
