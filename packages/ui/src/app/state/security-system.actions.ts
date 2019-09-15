import { SecuritySystem } from './security-system.state';

export type ArmedMode = 'away' | 'stay';
export type SecuritySystemStateName = 'armed' | 'arming' | 'disarmed' | 'disarming';
export type SecuritySystemStatus = 'armed' | 'disarmed';


export enum SecuritySystemState {
	Armed = 'armed',
	Arming = 'arming',
	Disarmed = 'disarmed',
	Disarming = 'disarming',
	Intrusion = 'intrusion'
}

export class ArmSystem {
	static readonly type = '[Security System] Arm System';

	constructor(public mode: ArmedMode, public delay: number = 0) {}
}

export class ArmSystemWithDelay {
	static readonly type = '[Security System] Arm System with Delay';

	constructor(public mode: ArmedMode) {}
}

export class DisarmSystem {
	static readonly type = '[Security System] Disarm System';

	constructor(public code: string) {}
}

export class CheckStatus {
	static readonly type = '[Security System] Check Status';

	constructor() {}
}

export interface CountdownPayload {
	duration: number;
	startTime: Date;
}

export class StartCountdown {
	static readonly type = '[Security System] Start Countdown';

	constructor(public payload: CountdownPayload) {}
}

export class ResetCountdown {
	static readonly type = '[Security System] Reset Countdown';

	constructor() {}
}

export class SetState {
	static readonly type = '[Security System] Set State';

	constructor(
		public systemState: SecuritySystemState,
		public timestamp: Date
	) {}
}

export class SetStatus {
	static readonly type = '[Security System] Set Status';

	constructor(status: 'armed' | 'disarmed') {}
}

export class SubmitCode {
	static readonly type = '[Security System] Submit Code';

	constructor(public code: string) {}
}

export class TryDisarm {
	static readonly type = '[Security System] Try Disarm';

	constructor(public delay: number = 30) {}
}
