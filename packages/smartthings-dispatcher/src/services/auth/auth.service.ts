import * as bcrypt from 'bcryptjs';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { injectable, inject } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import * as passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import TYPES from '../../di/types';
import { NotAuthenticatedError } from '../../errors';
import { UserModel, Credentials, Token } from '../../models';


@injectable()
export class AuthService {
	constructor(@inject(TYPES.Secret) secret: string) {
		const options: StrategyOptions = {
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromUrlQueryParameter('token'),
				ExtractJwt.fromAuthHeaderAsBearerToken()
			]),
			secretOrKey: secret,
			passReqToCallback: true
		};

		const strategy = new Strategy(options, async (req: express.Request, payload: any, done) => {
			try {
				let token: string;

				if (req.method === 'GET') {
					token = req.query['token'];
				} else {
					token = req.header('Authorization').replace(/Bearer /, '');
				}

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

	async authenticateUser(credentials: Credentials): Promise<Token> {
		const user = await UserModel.findOne({ email: credentials.email });

		if (!user) {
			throw new NotAuthenticatedError();
		}

		const authenticated = await bcrypt.compare(credentials.password, user.password);

		if (!authenticated) {
			throw new NotAuthenticatedError();
		}

		return user.tokens.find((token) => {
			return token.access === 'auth';
		});
	}

	async getUser(token): Promise<any> {
		return await Promise.resolve({});
	}
}
