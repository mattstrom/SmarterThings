import * as express from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost, request, requestBody, response, queryParam } from 'inversify-express-utils';
import * as HttpStatus from 'http-status-codes';
import * as request2 from 'request';
import * as Url from 'url';

import TYPES from '../di/types';
import { NotAuthenticatedError } from '../errors';
import { User, UserModel, Credentials } from '../models';
import { AuthService } from '../services/auth';


@controller('')
@injectable()
export class MainController {
	@inject(TYPES.RedirectUrl) redirectUrl: string;
	@inject(TYPES.AuthService) authService: AuthService;

	constructor() { }

	// @httpGet('/')
	// private index(@response() res: express.Response) {
	// 	res.render('index');
	// }

	// @httpGet('/login')
	// private login(
	// 	@response() res: express.Response,
	// 	@queryParam('redirectUrl') redirectUrl: string
	// ) {
	// 	redirectUrl = redirectUrl || this.redirectUrl;

	// 	res.render('login', {
	// 		redirectUrl: redirectUrl
	// 	});
	// }

	// @httpPost('/login')
	// private async loginPost(
	// 	@requestBody() body: Credentials,
	// 	@response() res: express.Response,
	// 	@queryParam('redirectUrl') redirectUrl?: string
	// ) {
	// 	redirectUrl = redirectUrl || this.redirectUrl;

	// 	try {
	// 		await this.authService.authenticateUser(body);

	// 		res.redirect(redirectUrl);
	// 	} catch (e) {
	// 		res.render('login');
	// 	}
	// }
}
