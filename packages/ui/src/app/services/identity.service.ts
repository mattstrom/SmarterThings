import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';
import * as uuid from 'uuid';

@Injectable()
export class IdentityService {
	get clientId() {
		return Cookies.get('clientId');
	}

	constructor() {
		if (!this.clientId) {
			Cookies.set('clientId', uuid.v4());
		}
	}
}
