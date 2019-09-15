import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from '../../configuration';
import { AuthService } from './auth.service';


export interface JwtPayload {
	email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor(
		private readonly authService: AuthService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromUrlQueryParameter('token'),
				ExtractJwt.fromAuthHeaderAsBearerToken()
			]),
			secretOrKey: config.jwtSecret
		});
	}

	async validate(payload: JwtPayload, done: Function) {
		const user = await this.authService.validateUser(payload);

		if (!user) {
			return done(new UnauthorizedException(), false);
		}

		done(null, user);
	}
}
