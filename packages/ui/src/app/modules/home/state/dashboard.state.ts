import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { combineLatest } from 'rxjs';
import { SecuritySystem, SecuritySystemState, Sensors } from '../../../state';
import { DashboardPanel, SetLeftPanel, SetRightPanel, ShowBypassedSensors } from './dashboard.actions';


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

	constructor(private readonly store: Store) {
		combineLatest(
			this.store.select(SecuritySystem.getState),
			this.store.select(Sensors.getSensorStatus)
		)
			.subscribe(([state, sensorStatus]) => {
				switch (state) {
					case SecuritySystemState.Armed: {
						this.store.dispatch(new SetLeftPanel(DashboardPanel.DisarmControls));
						this.store.dispatch(new SetRightPanel(DashboardPanel.News));
						break;
					}
					case SecuritySystemState.Arming: {
						this.store.dispatch(new SetLeftPanel(DashboardPanel.Countdown));
						this.store.dispatch(new SetRightPanel(DashboardPanel.Keypad));
						break;
					}
					case SecuritySystemState.Disarmed: {
						const leftAction = (sensorStatus === 'ready')
							? new SetLeftPanel(DashboardPanel.ArmControls)
							: new SetLeftPanel(DashboardPanel.BypassControls);

						this.store.dispatch([
							leftAction,
							new SetRightPanel(DashboardPanel.News)
						]);
						break;
					}
					case SecuritySystemState.Disarming: {
						this.store.dispatch(new SetLeftPanel(DashboardPanel.Countdown));
						this.store.dispatch(new SetRightPanel(DashboardPanel.Keypad));
						break;
					}
					case SecuritySystemState.Intrusion: {
						this.store.dispatch(new SetLeftPanel(DashboardPanel.Countdown));
						this.store.dispatch(new SetRightPanel(DashboardPanel.Keypad));
						break;
					}
					default: {
						throw new TypeError('Invalid security system state');
					}
				}
			});
	}

	@Action(ShowBypassedSensors)
	showBypassedSensors() {

	}

	@Action(SetLeftPanel)
	setLeftPanel(ctx: StateContext<DashboardStateModel>, payload: SetLeftPanel) {
		ctx.patchState({
			left: payload.panel
		});
	}

	@Action(SetRightPanel)
	setRightPanel(ctx: StateContext<DashboardStateModel>, payload: SetRightPanel) {
		ctx.patchState({
			right: payload.panel
		});
	}

	@Selector()
	static leftPanel(state: DashboardStateModel) {
		return state.left;
	}

	@Selector()
	static rightPanel(state: DashboardStateModel) {
		return state.right;
	}
}
