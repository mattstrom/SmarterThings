import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services';


@Component({
	selector: 'smt-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
	@Input() loading: boolean = false;

	public oauthUrl: string;

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
}
