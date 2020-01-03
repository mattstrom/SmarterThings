import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { SecuritySystem, SecuritySystemState, Sensors, SensorStatus } from '../../../../state';
import { DashboardPanel, DashboardState } from '../../state';


@Component({
	selector: 'smt-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	@Select(Sensors.getSensorStatus)
	public sensorStatus$: Observable<SensorStatus>;

	@Select(SecuritySystem.getState)
	public state$: Observable<SecuritySystemState>;

	@Select(DashboardState.leftPanel)
	public leftPanel$: Observable<DashboardPanel>;

	@Select(DashboardState.rightPanel)
	public rightPanel$: Observable<DashboardPanel>;

	public state: SecuritySystemState;

	constructor() {}

	ngOnInit() {
		this.state$.subscribe(state => {
			this.state = state;
		});
	}
}
