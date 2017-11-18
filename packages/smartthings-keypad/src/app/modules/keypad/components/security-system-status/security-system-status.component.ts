import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SecuritySystemService, SecuritySystemStatus } from '../../../../services';


@Component({
	selector: 'security-system-status',
	templateUrl: './security-system-status.component.html',
	styleUrls: ['./security-system-status.component.scss']
})
export class SecuritySystemStatusComponent {
	private _status$: Observable<SecuritySystemStatus>;
	get status$() {
		return this._status$;
	}

	constructor(private securitySystem: SecuritySystemService) {
		this._status$ = this.securitySystem.status$;
	}
}
