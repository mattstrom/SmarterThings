import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';
import * as uuid from 'uuid';

@Injectable()
export class IdentityService {
	get identity() {
		return Cookies.get('identity');
	}

	constructor() {
		if (!this.identity) {
			Cookies.set('identity', uuid.v4());
		}
	}
}
