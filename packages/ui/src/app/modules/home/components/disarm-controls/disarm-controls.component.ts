import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { TryDisarm } from '../../../../state';


@Component({
	selector: 'smt-disarm-controls',
	templateUrl: './disarm-controls.component.html',
	styleUrls: ['./disarm-controls.component.scss']
})
export class DisarmControlsComponent implements OnInit {

	constructor(private readonly store: Store) {}

	ngOnInit() {
	}

	onDisarm = (silent: boolean = false) => {
		this.store.dispatch(new TryDisarm());
	}

	onQuickExit = (silent: boolean = false) => {
		this.store.dispatch(new TryDisarm());
	}
}
