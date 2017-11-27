import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import * as HttpStatus from 'http-status-codes';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { IdentityService, KeycodeService, WebSocketService } from './index';
import { ApiUrlToken } from './tokens';


export type SecuritySystemStatus = 'armed' | 'disarmed' | 'unknown';

@Injectable()
export class SecuritySystemService {
	readonly countdown$ = new BehaviorSubject<number | null>(null);
	readonly status$ = new BehaviorSubject<SecuritySystemStatus>('unknown');
	readonly validCode$ = new BehaviorSubject<boolean | null>(null);

	constructor(
		private http: HttpClient,
		private identityService: IdentityService,
		private keycodeService: KeycodeService,
		private webSocketService: WebSocketService,
		@Inject(ApiUrlToken) private apiUrl: string
	) {
		this.checkStatus();

		this.webSocketService.socket
			.subscribe((message) => {
				this.handleMessage(message);
			});
	}

	arm() {
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		const payload = JSON.stringify({
			identity: this.identityService.identity
		});

		this.http
			.put(`${this.apiUrl}/security/arm`, payload, {
				headers: headers,
				observe: 'response'
			})
			.subscribe((response) => {
				switch (response.status) {
					case HttpStatus.NO_CONTENT: {
						break;
					}
					default: {
						break;
					}
				}
			});
	}

	disarm(): void {
		const code = this.keycodeService.code$.getValue();

		if (code.length < 4) {
			throw new RangeError();
		}

		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		const payload = JSON.stringify({
			identity: this.identityService.identity,
			securityCode: code
		});

		this.http
			.put(`${this.apiUrl}/security/disarm`, payload, {
				headers: headers,
				observe: 'response'
			})
			.subscribe((response: HttpResponse<any>) => {
				switch (response.status) {
					case HttpStatus.NO_CONTENT: {
						this.validCode$.next(true);
						break;
					}
					case HttpStatus.FORBIDDEN: {
						this.validCode$.next(false);
						break;
					}
					default: {
						break;
					}
				}
			});
	}

	private checkStatus() {
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		const payload = JSON.stringify({
			identity: this.identityService.identity
		});

		this.http
			.post<any>(`${this.apiUrl}/security/status`, payload, { headers: headers })
			.subscribe((body) => {
				this.status$.next(body.data);
			});
	}

	private handleMessage(message) {
		switch (message.action) {
			case 'updateStatus': {
				this.status$.next(message.data.status);

				if (message.data.status === 'disarmed') {
					this.countdown$.next(null);
				}

				break;
			}
			case 'startCountdown': {
				const duration = message.data.duration;
				const end = new Date(message.data.startTime);
				end.setSeconds(end.getSeconds() + duration);

				const now = new Date();
				const diff = end.getTime() - now.getTime();
				const remaining = Math.floor(diff / 1000);

				this.countdown$.next(remaining);
				break;
			}
			default: {
				break;
			}
		}
	}
}
