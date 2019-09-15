import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Sensor } from '../../../../models';
import { Sensors } from '../../../../state';


@Component({
	selector: 'smt-bypassed-badge',
	templateUrl: './bypassed-badge.component.html',
	styleUrls: ['./bypassed-badge.component.scss']
})
export class BypassedBadgeComponent implements OnInit {

	@Select(Sensors.getBypassedSensors)
	bypassedSensors$: Observable<Sensor[]>;

	public count$: Observable<number>;

	constructor() {}

	ngOnInit() {
		this.count$ = this.bypassedSensors$.pipe(
			map(sensors => sensors.length)
		);
	}
}
