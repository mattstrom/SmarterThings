import { Component, Input, OnInit } from '@angular/core';
import { Sensor } from '../../../../models';

@Component({
	selector: 'smt-sensor-list-item',
	templateUrl: './sensor-list-item.component.html',
	styleUrls: ['./sensor-list-item.component.scss']
})
export class SensorListItemComponent implements OnInit {
	@Input() sensor: Sensor;

	public icon: string;
	public status: 'active' | 'inactive';

	constructor() {
	}

	ngOnInit() {
		this.icon = (this.sensor.type === 'contact')
			? 'compare_arrows'
			: 'compare_arrows';

		this.status = (['open', 'motion'].includes(this.sensor.value))
			? 'active'
			: 'inactive';
	}
}
