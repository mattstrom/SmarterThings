import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Sensor } from '../../../../models';
import { Sensors } from '../../../../state';


@Component({
	selector: 'smt-sensor-list',
	templateUrl: './sensor-list.component.html',
	styleUrls: ['./sensor-list.component.scss']
})
export class SensorListComponent {
	@Select(Sensors.getSensors)
	public sensors: Observable<Sensor[]>;

	@Select(Sensors.getTrippedSensors)
	public trippedSensors: Observable<Sensor[]>;

	constructor() {}
}
