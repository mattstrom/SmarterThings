import * as express from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost, request, requestBody, response } from 'inversify-express-utils';
import * as HttpStatus from 'http-status-codes';

import TYPES from '../di/types';
import { User, UserModel } from '../models';


@controller('')
@injectable()
export class MainController {

	constructor(@inject(TYPES.Mongoose) connection: any) { }

	@httpGet('/')
	private index(@response() res: express.Response) {
		res.render('index');
	}

	@httpGet('/login')
	private login(@response() res: express.Response) {
		res.render('login');
	}

	@httpPost('/login')
	private async loginPost(
		@requestBody() body: Partial<User>,
		@response() res: express.Response
	) {
		const authenticated = await UserModel
			.findOne({
				username: body.email,
				password: body.password
			});

		if (!authenticated) {
			res.status(HttpStatus.FORBIDDEN).send();
			return;
		}

		res.render('login');
	}
}
