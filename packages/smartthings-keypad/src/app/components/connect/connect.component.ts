import { Component, OnInit, Inject } from '@angular/core';

import { AccessTokenKey } from '../../services';
import { ApiUrlToken } from '../../services/tokens';


@Component({
	selector: 'smt-connect',
	templateUrl: './connect.component.html',
	styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
	public oauthUrl: string;

	constructor(@Inject(ApiUrlToken) private apiUrl: string) {
		const token = localStorage.getItem(AccessTokenKey);

		this.oauthUrl = `${this.apiUrl}/oauth?entry=${location.href}`;

		if (token) {
			this.oauthUrl = `${this.oauthUrl}&token=${token}`;
		}
	}

	ngOnInit() {
	}
}
