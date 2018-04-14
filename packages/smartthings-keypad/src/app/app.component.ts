import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import {
	SmartThingsApiToken,
	SmartThingsEndpoint
} from './app.values';
import { AuthService, IdentityService, WebSocketService } from './services';
import { ApiUrlToken } from './services/tokens';


@Component({
	selector: 'st-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public oauthUrl: string;

	constructor(
		private authService: AuthService,
		private router: Router,
		private webSocketService: WebSocketService
	) {
		webSocketService.message$.subscribe((data) => {
			console.log(data);
		});
	}

	onLogout() {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}
