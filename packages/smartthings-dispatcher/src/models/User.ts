import * as bcrypt from 'bcryptjs';
import { SHA256 } from 'crypto-js';
import * as jwt from 'jsonwebtoken';
import { pick } from 'lodash';
import * as mongoose from 'mongoose';
import { arrayProp, instanceMethod, pre, prop, Typegoose, staticMethod, InstanceType, ModelType } from 'typegoose';

import container from '../di/inversify.config';
import TYPES from '../di/types';
import { Token } from './Token';
import { EmailValidator } from './validators';


const secret = container.get<string>(TYPES.Secret);

@pre<User>('save', onPreSave)
export class User extends Typegoose {
	@prop({
		required: true,
		minlength: 1,
		unique: true,
		// validate: EmailValidator
	})
	email: string;

	@prop({
		required: true,
		minlength: 6
	})
	password: string;

	@arrayProp({ items: Token })
	tokens: Token[];

	@instanceMethod
	toJSON(this: InstanceType<User>) {
		return pick(this.toObject(), ['_id', 'email']);
	}

	@instanceMethod
	async generateAuthToken(this: InstanceType<User>): Promise<string> {
		const user = this;
		const access = 'auth';
		const token = jwt.sign({
			_id: user['_id'].toHexString()
		}, secret);

		user.tokens.push({
			access: 'auth',
			token: token
		});

		await user.save();

		return token;
	}

	@staticMethod
	static async findByToken(this: ModelType<User> & typeof User, token: string) {
		let decoded: object;

		try {
			decoded = jwt.verify(token, secret) as object;
		} catch (e) {
			return Promise.reject(null);
		}

		return await UserModel.findOne({
			_id: decoded['_id'],
			'tokens.token': token,
			'tokens.access': 'auth'
		});
	}
}

export const UserModel = new User().getModelForClass(User);

async function onPreSave(this, next: Function) {
	if (this.isModified('password')) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(this.password, salt);

		this.password = hash;

		next();
	} else {
		next();
	}
}
