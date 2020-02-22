import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeviceState } from '../../../../state';

import { AuthService } from '../../../auth/services';


@Component({
	selector: 'smt-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
	@Input() color: string = 'primary';
	@Input() loading: boolean = false;

	public oauthUrl: string;

	@Select(DeviceState.getBatteryLevelIcon)
	public batteryLevelIcon$: Observable<string>;

	constructor(
		public authService: AuthService,
		private router: Router
	) {}

	onDisconnect() {
		this.authService.disconnect();
		this.router.navigate(['/connect']);
	}

	onLogout() {
		this.authService.logout();
		this.router.navigate(['/login']);
	}

	onRegister() {
		this.router.navigate(['/register']);
	}
}
