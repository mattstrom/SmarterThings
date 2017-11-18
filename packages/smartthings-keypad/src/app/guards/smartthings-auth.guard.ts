import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IdentityService } from '../services';
import { ApiUrlToken } from '../services/tokens';


@Injectable()
export class SmartThingsAuthGuard implements CanActivate {
	constructor(
		private http: Http,
		private identityService: IdentityService,
		@Inject(ApiUrlToken) private apiUrl
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		const identity = this.identityService.identity;

		return this.http.get(`${this.apiUrl}/security/authenticated?identity=${identity}`)
			.map((response) => response.json())
			.map((value) => {
				return value;
			});
	}
}
