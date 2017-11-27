import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, ViewEncapsulation } from '@angular/core';

import {
	SmartThingsApiToken,
	SmartThingsEndpoint
} from './app.values';
import { IdentityService, WebSocketService } from './services';
import { ApiUrlToken } from './services/tokens';


@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public oauthUrl: string;

	constructor(
		private http: HttpClient,
		private identityService: IdentityService,
		private webSocketService: WebSocketService,
		@Inject(ApiUrlToken) private apiUrl: string,
		@Inject(SmartThingsApiToken) private token: string,
		@Inject(SmartThingsEndpoint) private endpoint: string
	) {
		this.oauthUrl = `${this.apiUrl}/oauth?entry=${location.href}`;

		webSocketService.socket.subscribe((data) => {
			console.log(data);
		});
	}

	onArm(event) {
		fetch(`${this.endpoint}/arm`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.token}`
			}
		});
	}

	onDisarm(event) {
		const headers = new HttpHeaders();
		headers.set('Authorization', `Bearer ${this.token}`);

			this.http.put(`${this.endpoint}/disarm`, {}, {
				headers: headers
			}).subscribe();
		}
}
