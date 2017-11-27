import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import * as HttpStatus from 'http-status-codes';
import {  } from 'jwt-decode';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { share } from 'rxjs/operator/share';

import { Credentials } from '../models/credentials.model';
import { ApiUrlToken } from './tokens';


export const AccessTokenKey = 'access_token';

@Injectable()
export class AuthService {

	constructor(
		private http: HttpClient,
		@Inject(ApiUrlToken) private apiUrl: string
	) { }

	login(credentials: Credentials): Observable<boolean> {
		return this.http
			.post(`${this.apiUrl}/auth/login`, credentials, {
				observe: 'response'
			})
			.map((response: HttpResponse<any>) => {
				if (response.status === HttpStatus.OK) {
					localStorage.setItem(AccessTokenKey, response.body.jwt);

					return true;
				}
				return false;
			})
			.share();
	}

	logout() {
		localStorage.setItem(AccessTokenKey, null);
	}

	getToken(): string {
		return localStorage.getItem(AccessTokenKey);
	}

	isAuthenticated(): boolean {
		const token = this.getToken();

		return !!token;
	}
}
