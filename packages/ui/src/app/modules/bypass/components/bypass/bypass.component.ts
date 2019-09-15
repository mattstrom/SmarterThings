import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { BypassSensors } from '../../../../state';


@Component({
	selector: 'smt-bypass',
	templateUrl: './bypass.component.html',
	styleUrls: ['./bypass.component.scss']
})
export class BypassComponent implements OnInit {

	constructor(private readonly store: Store) {
	}

	ngOnInit() {
	}

	onBypass = () => {
		this.store.dispatch(new BypassSensors());
	}
}
