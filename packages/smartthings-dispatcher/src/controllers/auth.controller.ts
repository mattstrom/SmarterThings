import * as bcrypt from 'bcryptjs';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost, request, requestBody, response, interfaces, queryParam } from 'inversify-express-utils';
import * as passport from 'passport';

import TYPES from '../di/types';
import { NotAuthenticatedError } from '../errors';
import { authenticator } from '../middleware';
import { User, UserModel, Credentials } from '../models';
import { AuthService } from '../services/auth';


@controller('/auth')
@injectable()
export class AuthController {
	@inject(TYPES.AuthService) authService: AuthService;

	constructor() { }

	@httpPost('/login')
	private async login(
		@requestBody() body: Credentials,
		@response() res: express.Response
	) {
		try {
			const token = await this.authService.authenticateUser(body);
			const payload = {
				jwt: token.token,
				expires: null
			};


			res.header('X-Auth', token.token)
				.status(HttpStatus.OK)
				.send(payload);
		} catch (e) {
			if (e instanceof NotAuthenticatedError) {
				res.status(HttpStatus.UNAUTHORIZED).send();
			}
		}
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
		return await Promise.resolve();
	}
}
