import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Sensor } from '../../../../models';
import { Sensors } from '../../../../state';


@Component({
	selector: 'smt-sensors',
	templateUrl: './sensors.component.html',
	styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {
	displayedColumns: string[] = ['name', 'type'];

	@Select(Sensors.getSensors)
	public sensors$: Observable<Sensor[]>;

	constructor() {}

	ngOnInit() {
	}
}
