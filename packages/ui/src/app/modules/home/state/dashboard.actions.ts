
export enum DashboardPanel {
	ArmControls = 'arm-controls',
	BypassControls = 'bypass-controls',
	BypassedSensors = 'bypassed-sensors',
	Countdown = 'countdown',
	DisarmControls = 'disarm-controls',
	Keypad = 'keypad',
	News = 'news'
}

export class ShowBypassedSensors {
	static readonly type = '[Dashboard] Show Bypassed Sensors';

	constructor() {}
}

export class SetLeftPanel {
	static readonly type = '[Dashboard] Set Left Panel';

	constructor(public panel: DashboardPanel, public width: string = '50%') {}
}

export class SetRightPanel {
	static readonly type = '[Dashboard] Set Right Panel';

	constructor(public panel: DashboardPanel, public width: string = '50%') {}
}
