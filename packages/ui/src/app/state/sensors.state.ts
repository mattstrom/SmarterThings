import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Sensor } from '../models';
import { AuthService } from '../modules/auth/services';

import { ApiUrlToken } from '../tokens';
import { BypassSensors, GetSensors } from './sensors.actions';


export enum SensorStatus {
	Bypassed = 'bypassed',
	NotReady = 'not-ready',
	Ready = 'ready'
}

export interface SensorsModel {
	status: SensorStatus;
	sensors: Sensor[];
	trippedSensors: Sensor[];
	bypassedSensors: Sensor[];
}

@State<SensorsModel>({
	name: 'getSensors',
	defaults: {
		status: SensorStatus.NotReady,
		sensors: [],
		trippedSensors: [],
		bypassedSensors: []
	}
})
export class Sensors implements NgxsOnInit {

	constructor(
		private readonly authService: AuthService,
		private readonly http: HttpClient,
		@Inject(ApiUrlToken) private readonly apiUrl: string
	) {}

	ngxsOnInit(ctx: StateContext<SensorsModel>) {
		ctx.dispatch(new GetSensors());
	}

	@Action(BypassSensors)
	bypassSensors({ patchState }: StateContext<SensorsModel>) {
		return this.http.put(`${this.apiUrl}/security/sensors/bypass`, {});
	}

	@Action(GetSensors)
	getSensors({ patchState }: StateContext<SensorsModel>) {
		if (!this.authService.isAuthenticated()) {
			return;
		}

		this.http.get(`${this.apiUrl}/security/sensors`)
			.subscribe((sensors: Sensor[]) => {
				patchState({
					sensors,
					bypassedSensors: sensors
						.filter(s => s.bypassed),
					trippedSensors: sensors
						.filter(s => !s.bypassed)
						.filter(s => ['open', 'motion'].includes(s.value))
				});
			});
	}

	@Selector() static getSensorStatus(state: SensorsModel): SensorStatus {
		return (state.trippedSensors.length === 0)
			? SensorStatus.Ready
			: SensorStatus.NotReady;
	}

	@Selector() static getSensors(state: SensorsModel) {
		return state.sensors;
	}

	@Selector() static getBypassedSensors(state: SensorsModel) {
		return state.sensors.filter(sensor => sensor.bypassed);
	}

	@Selector() static getTrippedSensors(state: SensorsModel) {
		return state.trippedSensors;
	}
}
