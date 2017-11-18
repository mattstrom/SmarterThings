import 'reflect-metadata';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as hbs from 'express-handlebars';
import * as path from 'path';
import * as program from 'commander';

import { MainController, OAuthController, TriggerController, WildcardController } from './controllers';
import container from './di/inversify.config';
import TYPES from './di/types';


const ROOT = path.join(path.resolve(__dirname), '..');

program.version('1.0.0')
	.usage('[options]')
	.option('--clientId <id>', 'Client ID')
	.option('--clientSecret <secret>', 'Client Secret')
	.parse(process.argv);

container.bind<string>(TYPES.ClientId).toConstantValue(program['clientId']);
container.bind<string>(TYPES.ClientSecret).toConstantValue(program['clientSecret']);

container.bind<interfaces.Controller>(TYPE.Controller).to(MainController).whenTargetNamed('MainController');
container.bind<interfaces.Controller>(TYPE.Controller).to(OAuthController).whenTargetNamed('OAuthController');
container.bind<interfaces.Controller>(TYPE.Controller).to(TriggerController).whenTargetNamed('TriggerController');
//container.bind<interfaces.Controller>(TYPE.Controller).to(WildcardController).whenTargetNamed('WildcardController');

const server = new InversifyExpressServer(container);

server
	.setConfig((app) => {
		const options: ExphbsOptions = {
			extname: 'hbs'
		};

		app.engine('handlebars', hbs({ defaultLayout: 'index', extname: 'hbs' }));
		app.set('view engine', 'handlebars');
		app.set('views', path.join(ROOT, 'views'));

		app.use(bodyParser.urlencoded({
			extended: true
		}));

		app.use(bodyParser.json());

		app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'accept, content-type, x-app-key');

			next();
		});

		app.use('/lib/bootstrap', express.static(path.join(ROOT, 'node_modules/bootstrap/dist')));
	})
	.build()
	.listen(4567);
