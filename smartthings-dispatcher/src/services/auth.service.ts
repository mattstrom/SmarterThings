import { injectable } from 'inversify' ;

@injectable()
export class AuthService {
	token: string;

	constructor() {

	}

	get() {
		return this.token;
	}

	set(token: string) {
		this.token = token;
	}
}
