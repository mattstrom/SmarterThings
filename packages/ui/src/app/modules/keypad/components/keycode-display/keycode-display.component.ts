import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { KeycodeService, SecuritySystemService } from '../../services';


export type CodeStatus = 'valid' | 'invalid' | 'unknown';

@Component({
	selector: 'keycode-display',
	templateUrl: './keycode-display.component.html',
	styleUrls: ['./keycode-display.component.scss']
})
export class KeycodeDisplayComponent implements OnInit {
	code$: Observable<any>;
	codeStatus: CodeStatus = 'unknown';

	constructor(
		private keycodeService: KeycodeService,
		private securitySystem: SecuritySystemService
	) {
		this.code$ = this.keycodeService.code$;
	}

	ngOnInit() {
		this.securitySystem.validCode$
			.subscribe((value) => {
				this.codeStatus = (value !== null)
					? (value === true)
						? 'valid'
						: 'invalid'
					: 'unknown';
			});
	}
}
