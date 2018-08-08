import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as HttpStatus from 'http-status-codes';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ApiUrlToken } from '../../../tokens';


@Injectable()
export class SmartThingsAuthGuard implements CanActivate {
	constructor(
		private http: HttpClient,
		private router: Router,
		@Inject(ApiUrlToken) private apiUrl
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.http
			.get<boolean>(`${this.apiUrl}/oauth/connected`)
			.pipe(
				tap(connected => {
					if (!connected) {
						this.router.navigate(['connect']);
					}
				}),
				catchError((err: HttpErrorResponse) => {
					if (err.status === HttpStatus.UNAUTHORIZED) {
						this.router.navigate(['login']);
						return of(false);
					}

					throw err;
				})
			);
	}
}
