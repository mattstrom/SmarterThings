import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiUrlToken } from '../../../tokens';
import { AuthService } from './auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(
		public auth: AuthService,
		@Inject(ApiUrlToken) private apiUrl: string
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url.startsWith(this.apiUrl)) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${this.auth.getToken()}`
				}
			});
		}

		return next.handle(request);
	}
}
