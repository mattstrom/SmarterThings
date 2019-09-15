
export class PressKey {
	static readonly type = '[Keycode] Press Key';

	constructor(public value: string) {}
}

export class ResetCode {
	static readonly type = '[Keycode] Reset Code';

	constructor() {}
}
