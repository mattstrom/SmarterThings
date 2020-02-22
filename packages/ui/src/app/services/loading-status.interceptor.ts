import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { SetLoadingStatus } from '../state';


@Injectable()
export class LoadingStatusInterceptor implements HttpInterceptor {
	constructor(private readonly store: Store) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.store.dispatch(new SetLoadingStatus(true));

		return next.handle(request).pipe(
			tap(event => {
				if (event.type === HttpEventType.Response) {
					this.store.dispatch(new SetLoadingStatus(false));
				}
			}),
			catchError(err => {
				return this.store.dispatch(new SetLoadingStatus(false));
			})
		);
	}
}
