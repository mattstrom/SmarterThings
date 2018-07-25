import { Body, Controller, Post, Response } from '@nestjs/common';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

import { Credentials } from '../entities';
import { AuthService } from './auth.service';
import { NotAuthenticatedError } from './not-authenticated.error';


@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@Post('/login')
	private async login(
		@Body() body: Credentials,
		@Response() res: express.Response
	) {
		try {
			const token = await this.authService.authenticateUser(body);

			res.header('X-Auth', token)
				.status(HttpStatus.OK)
				.type('text/text')
				.send(token);
		} catch (e) {
			if (e instanceof NotAuthenticatedError) {
				res.status(HttpStatus.UNAUTHORIZED).send();
			}
		}
	}

	@Post('/register')
	private async register(
		@Body() credentials: Credentials,
		@Response() res: express.Response
	) {
		const user = await this.authService.registerUser(credentials);

		if (!user) {
			res.status(HttpStatus.CONFLICT)
				.send();
		}

		res.status(HttpStatus.OK)
			.send();

		return;
	}
}
