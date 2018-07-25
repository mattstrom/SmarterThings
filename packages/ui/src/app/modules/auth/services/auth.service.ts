import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import * as HttpStatus from 'http-status-codes';
import {  } from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { ApiUrlToken } from '../../../tokens';
import { Credentials } from '../models';


export const AccessTokenKey = 'accessToken';

@Injectable()
export class AuthService {

	constructor(
		private http: HttpClient,
		@Inject(ApiUrlToken) private apiUrl: string
	) { }

	login(credentials: Credentials): Observable<boolean> {
		return this.http
			.post(`${this.apiUrl}/auth/login`, credentials, {
				observe: 'response',
				responseType: 'text'
			})
			.pipe(
				map((response: HttpResponse<string>) => {
					if (response.status === HttpStatus.OK) {
						localStorage.setItem(AccessTokenKey, response.body);

						return true;
					}
					return false;
				}),
				share()
			);
	}

	logout() {
		localStorage.setItem(AccessTokenKey, null);
	}

	register(credentials: Credentials): Observable<boolean> {
		return this.http
			.post(`${this.apiUrl}/auth/register`, credentials, {
				observe: 'response'
			})
			.pipe(
				map((response: HttpResponse<any>) => {
					if (response.status === HttpStatus.OK) {
						localStorage.setItem(AccessTokenKey, response.body.jwt);

						return true;
					}
					return false;
				}),
				share()
			);
	}

	getToken(): string {
		return localStorage.getItem(AccessTokenKey);
	}

	isAuthenticated(): boolean {
		const token = this.getToken();

		return !!token;
	}
}
