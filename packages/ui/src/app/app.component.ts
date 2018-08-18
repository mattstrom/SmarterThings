import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from './modules/auth/services';
import { WebSocketService } from './modules/keypad/services';
import { IdentityService } from './services';
import { State } from './store';
import { loadingStatusQuery } from './store/loading-status/loading-status.selectors';


@Component({
	selector: 'smt-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public loading$: Observable<boolean>;
	public oauthUrl: string;

	constructor(
		private authService: AuthService,
		private identityService: IdentityService,
		private router: Router,
		private store: Store<State>,
		private updates: SwUpdate,
		private webSocketService: WebSocketService
	) {
		this.updates.available.subscribe(async event => {
			await this.updates.activateUpdate();
			location.reload();
		});

		webSocketService.message$.subscribe((data) => {
			console.log(data);
		});

		this.loading$ = this.store.pipe(select(loadingStatusQuery.getLoadingStatus));
	}

	onLogout() {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}
