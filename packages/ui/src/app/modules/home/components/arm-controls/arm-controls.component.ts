import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Sensor } from '../../../../models';

import { ArmSystem, SecuritySystem, Sensors } from '../../../../state';


@Component({
	selector: 'smt-arm-controls',
	templateUrl: './arm-controls.component.html',
	styleUrls: ['./arm-controls.component.scss']
})
export class ArmControlsComponent implements OnInit {
	public silentExit: boolean = false;
	public entryDelay: boolean = true;

	@Select(Sensors.getBypassedSensors)
	bypassedSensors$: Observable<Sensor[]>;

	@Select(SecuritySystem.getColor)
	color$: Observable<string>;

	constructor(private readonly store: Store) {}

	ngOnInit() {
	}

	public onArmAway = () => {
		const action = (this.entryDelay)
			? new ArmSystem('away', 30)
			: new ArmSystem('away');

		this.store.dispatch(action);
	}

	public onArmStay = () => {
		const action = (this.entryDelay)
			? new ArmSystem('stay')
			: new ArmSystem('stay');

		this.store.dispatch(action);
	}

	public onShowBypassed = () => {

	}
}
