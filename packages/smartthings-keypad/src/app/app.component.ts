import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Headers, Http } from '@angular/http';

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
		private http: Http,
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
				'Content-Type': 'application/jsonp',
				'Authorization': `Bearer ${this.token}`
			}
		});
	}

	onDisarm(event) {
		const headers = new Headers();
		headers.set('Authorization', `Bearer ${this.token}`);

			this.http.put(`${this.endpoint}/disarm`, {}, {
				headers: headers
			}).subscribe();
		}
}
