import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import * as passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import TYPES from '../../di/types';
import { UserModel } from '../../models';


@injectable()
export class AuthService {
	constructor(@inject(TYPES.Secret) secret: string) {
		const options: StrategyOptions = {
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: secret,
			passReqToCallback: true
		};

		const strategy = new Strategy(options, async (req, payload: any, done) => {
			try {
				const token = req.header('Authorization').replace(/Bearer /, '');
				const user = await UserModel.findOne({
					_id: payload['_id'],
					'tokens.token': token,
					'tokens.access': 'auth'
				});

				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (e) {
				return done(e, false);
			}
		});

		passport.use(strategy);
	}

	async getUser(token): Promise<any> {
		return await Promise.resolve({});
	}
}
