import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { AuthService } from './modules/auth/services';
import { WebSocketService } from './modules/keypad/services';
import { IdentityService } from './services';


@Component({
	selector: 'smt-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public oauthUrl: string;

	constructor(
		private authService: AuthService,
		private identityService: IdentityService,
		private router: Router,
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
	}

	onLogout() {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}
