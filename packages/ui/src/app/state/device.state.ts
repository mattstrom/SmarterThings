import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { GetBatteryStatus } from './device.actions';


export interface DeviceModel {
	batteryStatus: BatteryManager;
}

@State<DeviceModel>({
	name: 'device',
	defaults: {
		batteryStatus: null
	}
})
export class DeviceState implements NgxsOnInit {

	ngxsOnInit(ctx?: StateContext<any>): void | any {
		ctx.dispatch(new GetBatteryStatus());
	}

	@Action(GetBatteryStatus)
	async getBatteryStatus(ctx: StateContext<DeviceModel>) {
		const batteryStatus = await navigator.getBattery();

		ctx.patchState({
			batteryStatus
		});
	}

	@Selector()
	static getBatteryLevel(state: DeviceModel) {
		return state.batteryStatus.level;
	}

	@Selector()
	static getBatteryLevelIcon(state: DeviceModel) {
		const raw = state.batteryStatus.level;
		const level = Math.round(raw * 10) / 10;

		return (level === 100)
			? 'battery_full'
			: `battery_${Math.max(level, 20)}`;
	}
}
