import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

// import {
// 	SmartThingsApiToken,
// 	SmartThingsEndpoint
// } from './app.values';
import { AuthService } from './modules/auth/services';
import { IdentityService } from './services';
// import { IdentityService, WebSocketService } from './services';
// import { ApiUrlToken } from './services/tokens';


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
		// private webSocketService: WebSocketService
	) {
		// webSocketService.message$.subscribe((data) => {
		// 	console.log(data);
		// });
	}

	onLogout() {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}
