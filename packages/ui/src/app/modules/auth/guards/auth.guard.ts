import { Injectable } from '@angular/core';
import { CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		const redirectUrl = route.url.toString();

		return this.handleAuthentication(redirectUrl);
	}

	canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
		return this.handleAuthentication();
	}

	private handleAuthentication(redirectUrl?: string): boolean {
		const authenticated = this.authService.isAuthenticated();
		const queryParams = (redirectUrl) ? { redirectUrl } : {};

		if (!authenticated) {
			this.router.navigate(['login'], {
				queryParams: queryParams
			});
		}

		return authenticated;
	}
}
