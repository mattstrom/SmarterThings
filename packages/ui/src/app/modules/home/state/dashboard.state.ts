import { Action, Selector, State } from '@ngxs/store';

import { SecuritySystem, SecuritySystemState, Sensors, SensorStatus } from '../../../state';
import { DashboardPanel, ShowBypassedSensors } from './dashboard.actions';


export interface DashboardStateModel {
	left: DashboardPanel;
	right: DashboardPanel;
}

@State<DashboardStateModel>({
	name: 'dashboard',
	defaults: {
		left: DashboardPanel.ArmControls,
		right: DashboardPanel.News
	}
})
export class DashboardState {

	constructor() {}

	@Action(ShowBypassedSensors)
	showBypassedSensors() {

	}

	@Selector([SecuritySystem.getState, Sensors.getSensorStatus])
	static leftPanel(
		state: DashboardStateModel,
		securitySystemState: SecuritySystemState,
		sensorStatus: SensorStatus
	): DashboardPanel {
		switch (securitySystemState) {
			case SecuritySystemState.Armed: {
				return DashboardPanel.DisarmControls;
			}
			case SecuritySystemState.Disarmed: {
				return (sensorStatus === 'ready')
					? DashboardPanel.ArmControls
					: DashboardPanel.BypassControls;
			}
			case SecuritySystemState.Arming:
			case SecuritySystemState.Disarming:
			case SecuritySystemState.Intrusion: {
				return DashboardPanel.Countdown;
			}
			default: {
				throw new TypeError('Invalid security system state');
			}
		}
	}

	@Selector([SecuritySystem.getState])
	static rightPanel(
		state: DashboardStateModel,
		securitySystemState: SecuritySystemState
	): DashboardPanel {
		switch (securitySystemState) {
			case SecuritySystemState.Armed:
			case SecuritySystemState.Disarmed: {
				return DashboardPanel.News;
			}
			case SecuritySystemState.Arming:
			case SecuritySystemState.Disarming:
			case SecuritySystemState.Intrusion: {
				return DashboardPanel.Keypad;
			}
			default: {
				throw new TypeError('Invalid security system state');
			}
		}
	}
}
