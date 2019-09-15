import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Sensor } from '../../../../models';
import { Sensors } from '../../../../state';


@Component({
	selector: 'smt-bypassed-list',
	templateUrl: './bypassed-list.component.html',
	styleUrls: ['./bypassed-list.component.scss']
})
export class BypassedListComponent {

	@Select(Sensors)
	bypassedSensors$: Observable<Sensor[]>;

	constructor() {
	}
}
