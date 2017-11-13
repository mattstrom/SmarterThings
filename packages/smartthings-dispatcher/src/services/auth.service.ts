import * as express from 'express';
import { injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';

@injectable()
export class AuthService {
	async getUser(token): Promise<any> {
		return await Promise.resolve({});
	}
}
