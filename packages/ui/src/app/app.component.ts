import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AuthService } from './modules/auth/services';
import { IdentityService, SensorsService, WebSocketService } from './services';
import { LoadingStatus, SecuritySystem, SecuritySystemStateName, SecuritySystemStatus, SecuritySystemState } from './state';


@Component({
	selector: 'smt-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public oauthUrl: string;

	@Select(SecuritySystem.getColor)
	public color$: Observable<string>;

	@Select(LoadingStatus.getStatus)
	public loading$: Observable<boolean>;

	@Select(SecuritySystem.getStatus)
	public status$: Observable<SecuritySystemStatus>;

	@Select(SecuritySystem.getState)
	public systemState$: Observable<SecuritySystemState>;

	@Select(SecuritySystem.getStatusMessage)
	public statusMessage$: Observable<string>;

	constructor(
		private authService: AuthService,
		private identityService: IdentityService,
		private router: Router,
		private updates: SwUpdate,
		private sensors: SensorsService,
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
