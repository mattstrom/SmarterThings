import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IdentityService } from '../services';
import { ApiUrlToken } from '../services/tokens';


@Injectable()
export class SmartThingsAuthGuard implements CanActivate {
	constructor(
		private http: HttpClient,
		private identityService: IdentityService,
		private router: Router,
		@Inject(ApiUrlToken) private apiUrl
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		const identity = this.identityService.identity;

		return this.http
			.get<any>(`${this.apiUrl}/security/authenticated?identity=${identity}`)
			.do((authenticated) => {
				if (!authenticated) {
					this.router.navigate(['connect']);
				}
			})
			.map((authenticated) => {
				return authenticated;
			});
	}
}
