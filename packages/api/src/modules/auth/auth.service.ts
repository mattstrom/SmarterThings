import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { MongoEntityManager } from 'typeorm';

import config from '../../configuration';
import { Credentials, User } from '../../entities';
import { JwtPayload } from './jwt.strategy';


@Injectable()
export class AuthService {

	constructor(
		@InjectEntityManager() private entityManager: MongoEntityManager
	) {}

	async authenticateUser(credentials: Credentials): Promise<string> {
		const user = await this.entityManager.findOne(User, {
			email: credentials.email
		});

		if (!user) {
			throw new UnauthorizedException();
		}

		const authenticated = await bcrypt.compare(credentials.password, user.password);

		if (!authenticated) {
			throw new UnauthorizedException();
		}

		return this.createToken(user);
	}

	async registerUser(credentials: Credentials): Promise<User> {
		if (await this.entityManager.findOne(User, { email: credentials.email })) {
			return null;
		}

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(credentials.password, salt);

		const user = this.entityManager.create(User, {
			email: credentials.email,
			password: hashedPassword
		});

		return await this.entityManager.save(user);
	}

	async validateUser(payload: JwtPayload): Promise<User> {
		return await this.entityManager.findOne(User, {
			email: payload.email
		});
	}

	private createToken(user: User) {
		return jwt.sign({ email: user.email }, config.jwtSecret, { expiresIn: 3.15e7 });
	}
}
