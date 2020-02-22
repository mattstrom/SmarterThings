import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';
import { interval } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { AuthService } from '../modules/auth/services';

import { WebSocketService } from '../services';
import { ApiUrlToken } from '../tokens';
import { KeycodeState } from './keycode.state';
import {
	ArmSystem, CheckStatus, DisarmSystem, ResetCountdown, SecuritySystemState,
	SecuritySystemStatus, SetState, StartCountdown, SubmitCode, TryDisarm
} from './security-system.actions';
import { GetSensors } from './sensors.actions';


export interface SystemStatusUpdate {
	status: SecuritySystemState;
	timestamp: Date;
}

export interface SecuritySystemModel {
	countdown: number | null;
	state: SecuritySystemState;
	status: SecuritySystemStatus;
	lastUpdated: Date;
}

@State<SecuritySystemModel>({
	name: 'securitySystem',
	defaults: {
		countdown: null,
		state: SecuritySystemState.Disarmed,
		status: 'disarmed',
		lastUpdated: new Date()
	},
	children: [
		KeycodeState
	]
})
export class SecuritySystem implements NgxsOnInit {

	constructor(
		private readonly authService: AuthService,
		private readonly http: HttpClient,
		private readonly store: Store,
		private webSocketService: WebSocketService,
		@Inject(ApiUrlToken) private readonly apiUrl: string
	) {
		this.webSocketService.message$
			.subscribe((message) => {
				this.handleMessage(message);
			});
	}

	ngxsOnInit(ctx: StateContext<SecuritySystemModel>) {
		ctx.dispatch(new CheckStatus());
	}

	@Action(SubmitCode)
	submitCode(
		ctx: StateContext<SecuritySystemModel>,
		{ code }: SubmitCode
	) {
		return ctx.dispatch(new DisarmSystem(code));
	}

	@Action(ArmSystem)
	armSystem(
		{ dispatch }: StateContext<SecuritySystemModel>,
		{ mode, delay }: ArmSystem
	) {
		return this.http
			.put<SystemStatusUpdate>(`${this.apiUrl}/security/arm`, { mode, delay });
	}

	@Action(DisarmSystem)
	disarmSystem(
		{ dispatch, patchState }: StateContext<SecuritySystemModel>,
		{ code }: DisarmSystem
	) {
		return this.http.put<SystemStatusUpdate>(`${this.apiUrl}/security/disarm`, {
			securityCode: code
		});
	}

	@Action(CheckStatus)
	private checkStatus({ patchState }: StateContext<SecuritySystemModel>) {
		if (!this.authService.isAuthenticated()) {
			return;
		}

		this.http
			.post<any>(`${this.apiUrl}/security/status`, {})
			.subscribe((body) => {
				patchState({
					state: body.status,
					status: body.status
				});
			});
	}

	@Action(ResetCountdown)
	private resetCountdown(ctx: StateContext<SecuritySystemModel>) {
		ctx.patchState({
			countdown: null
		});
	}

	@Action(StartCountdown)
	private startCountdown(
		{ patchState }: StateContext<SecuritySystemModel>,
		{ payload }: StartCountdown
	) {
		const { duration } = payload;
		const end = new Date(payload.startTime);
		end.setSeconds(end.getSeconds() + duration);

		const period = 100;
		const now = new Date();
		const diff = end.getTime() - now.getTime();
		const remaining = Math.floor(diff / period);

		patchState({
			countdown: remaining
		});

		return interval(period).pipe(
			map(count => remaining - count),
			tap(time => patchState({
				countdown: time
			})),
			takeWhile(time => time > 0)
		);
	}

	@Action(SetState)
	private setSystemState(
		{ getState, patchState }: StateContext<SecuritySystemModel>,
		{ systemState, timestamp }: SetState
	) {
		const { lastUpdated } = getState();

		if (lastUpdated < timestamp) {
			patchState({
				state: systemState,
				status: systemState as 'armed' | 'disarmed',
				lastUpdated: timestamp
			});
		}
	}

	@Action(TryDisarm, { cancelUncompleted: true })
	private tryDisarm(ctx: StateContext<SecuritySystemModel>, { delay }: TryDisarm) {
		const payload = { delay };

		return this.http.put(`${this.apiUrl}/security/try-disarm`, payload);
	}

	private handleMessage(message) {
		const state = this.store.snapshot();
		const { timestamp } = message.data;

		switch (message.action) {
			case 'updateStatus': {

				return this.store.dispatch([
					new SetState(message.data.status, timestamp),
					new GetSensors()
				]);
			}
			case 'startCountdown': {
				const { duration, startTime, status } = message.data;

				return this.store.dispatch([
					new SetState(status, timestamp),
					new StartCountdown({ duration, startTime })
				]);
			}
			case 'refreshSensorsState': {
				return this.store.dispatch(new GetSensors());
			}
			default: {
				break;
			}
		}
	}

	@Selector()
	static getColor(state: SecuritySystemModel): string {
		switch (state.state) {
			case 'armed':
				return 'warn';
			case 'arming':
				return 'accent';
			case 'disarmed':
				return 'primary';
			case 'disarming':
				return 'accent';
			case 'intrusion':
				return 'warn';
			default:
				return '';
		}
	}

	@Selector()
	static getCountdown(state: SecuritySystemModel) {
		return state.countdown;
	}

	@Selector() static getState(state: SecuritySystemModel) {
		return state.state;
	}

	@Selector() static getStatus(state: SecuritySystemModel) {
		return state.status;
	}

	@Selector() static getStatusMessage(state: SecuritySystemModel): string {
		switch (state.state) {
			case SecuritySystemState.Armed:
				return 'System is armed';
			case SecuritySystemState.Arming:
				return 'Arming system';
			case SecuritySystemState.Disarmed:
				return 'System is ready to arm';
			case SecuritySystemState.Disarming:
				return 'Disarming system';
			case SecuritySystemState.Intrusion:
				return 'Intrusion detected';
			default:
				return '';
		}
	}
}
