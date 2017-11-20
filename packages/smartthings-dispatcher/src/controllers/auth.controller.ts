import * as bcrypt from 'bcryptjs';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost, request, requestBody, response, interfaces } from 'inversify-express-utils';
import * as passport from 'passport';

import TYPES from '../di/types';
import { authenticator } from '../middleware';
import { User, UserModel } from '../models';


@controller('/auth')
@injectable()
export class AuthController {

	constructor(@inject(TYPES.Mongoose) connection: any) { }

	@httpPost('/login')
	private async login(
		@requestBody() body: Partial<User>,
		@response() res: express.Response
	) {
		const user = await UserModel.findOne({ email: body.email });

		if (!user) {
			res.status(HttpStatus.UNAUTHORIZED).send();
		}

		const authenticated = await bcrypt.compare(body.password, user.password);

		if (!authenticated) {
			res.status(HttpStatus.UNAUTHORIZED).send();
			return;
		}

		const authToken = user.tokens.find((token) => {
			return token.access === 'auth';
		});

		res.header('X-Auth', authToken.token)
			.status(HttpStatus.OK)
			.send();
	}

	@httpPost('/register')
	private async register(@requestBody() body: User, @response() res: express.Response) {
		const user = new UserModel({
			email: body.email,
			password: body.password
		});

		try {
			const newUser = await user.save();
			const authToken = await user.generateAuthToken();

			res.header('X-Auth', authToken)
				.status(HttpStatus.CREATED)
				.send(newUser);
		} catch (e) {
			res.status(HttpStatus.BAD_REQUEST).send(e);
		}
	}

	@httpGet('/me', authenticator)
	private async me(@requestBody() body: User, @response() res: express.Response) {
		res.status(HttpStatus.OK).send();
	}
}
