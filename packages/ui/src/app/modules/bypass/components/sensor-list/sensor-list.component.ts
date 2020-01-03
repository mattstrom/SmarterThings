import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { pluck, map } from 'rxjs/operators';

import { Sensor } from '../../../../models';
import { Sensors } from '../../../../state';
import { sortBy } from '../../../../utils';


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

	public count$: Observable<number> = this.trippedSensors
		.pipe(
			pluck('length')
		);

	public sorted$: Observable<Sensor[]> = this.trippedSensors
		.pipe(
			map(sensors => sortBy(sensors, 'name'))
		);
}
