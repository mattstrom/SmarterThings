import { Component, OnInit, Inject } from '@angular/core';

import { ApiUrlToken } from '../../../../tokens';
import { AccessTokenKey } from '../../services';


@Component({
	selector: 'smt-connect',
	templateUrl: './connect.component.html',
	styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
	public oauthUrl: string;
	private deviceId: string = '96F6F8250146';

	constructor(@Inject(ApiUrlToken) private apiUrl: string) {
		const token = localStorage.getItem(AccessTokenKey);

		this.oauthUrl = `${this.apiUrl}/oauth?entry=${location.href}&deviceId=${this.deviceId}`;

		if (token) {
			this.oauthUrl = `${this.oauthUrl}&token=${token}`;
		}
	}

	ngOnInit() {
	}
}
