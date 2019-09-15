import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { KeycodeState } from '../../../../state';

import { KeycodeService, SecuritySystemService } from '../../services';


export type CodeStatus = 'valid' | 'invalid' | 'unknown';

@Component({
	selector: 'keycode-display',
	templateUrl: './keycode-display.component.html',
	styleUrls: ['./keycode-display.component.scss']
})
export class KeycodeDisplayComponent implements OnInit {

	@Select(KeycodeState.getCode)
	code$: Observable<string>;

	constructor() {}

	ngOnInit() {
		// this.securitySystem.validCode$
		// 	.subscribe((value) => {
		// 		this.codeStatus = (value !== null)
		// 			? (value === true)
		// 				? 'valid'
		// 				: 'invalid'
		// 			: 'unknown';
		// 	});
	}
}
