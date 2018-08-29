import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngxs/store';
import * as HttpStatus from 'http-status-codes';
import { Observable } from 'rxjs';
import { finalize, map, share } from 'rxjs/operators';

import { SetLoadingStatus } from '../../../state';
import { ApiUrlToken } from '../../../tokens';
import { Credentials } from '../models';


export const AccessTokenKey = 'accessToken';

@Injectable()
export class AuthService {

	constructor(
		private http: HttpClient,
		private store: Store,
		@Inject(ApiUrlToken) private apiUrl: string
	) { }

	login(credentials: Credentials): Observable<boolean> {
		this.store.dispatch(new SetLoadingStatus(true));

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
				finalize(() => {
					this.store.dispatch(new SetLoadingStatus(false));
				}),
				share()
			);
	}

	logout() {
		localStorage.removeItem(AccessTokenKey);
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

	disconnect() {
		return this.http
			.post(`${this.apiUrl}/oauth/disconnect`, {}, {
				observe: 'response',
				responseType: 'text'
			})
			.pipe(
				map((response: HttpResponse<string>) => {
					if (response.status === HttpStatus.OK) {
						return true;
					}
					return false;
				}),
				finalize(() => {
					this.store.dispatch(new SetLoadingStatus(false));
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
