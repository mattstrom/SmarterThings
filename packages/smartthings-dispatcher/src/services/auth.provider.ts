import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces } from 'inversify-express-utils';

import TYPES from '../di/types';
import { AuthService } from './index';
import { Principal } from '../entities';


@injectable()
export class AuthProvider implements interfaces.AuthProvider {
	@inject(TYPES.AuthService)
	private readonly _authService: AuthService;
	get authService() {
		return this._authService;
	}

	constructor() {}

	async getUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<interfaces.Principal> {
		const token = req.headers['x-auth-token'];
		const user = await this.authService.getUser(token);
		const principal = new Principal(user);

		return principal;
	}
}
