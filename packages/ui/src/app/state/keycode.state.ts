import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PressKey, ResetCode } from './keycode.actions';
import { SubmitCode } from './security-system.actions';


export interface KeycodeModel {
	code: string;
}

@State<KeycodeModel>({
	name: 'keycode',
	defaults: {
		code: ''
	}
})
export class KeycodeState {

	@Action(PressKey)
	pressKey(
		ctx: StateContext<KeycodeModel>,
		payload: PressKey
	) {
		const { code } = ctx.getState();
		const { value } = payload;

		let newCode;

		if (value === 'backspace') {
			newCode = code.slice(0, code.length - 1);
		} else if (value === 'clear') {
			newCode = '';
		} else {
			newCode = code + payload.value;
		}

		if (newCode.length === 4) {
			return ctx.dispatch([
				new SubmitCode(newCode),
				new ResetCode()
			]);
		}

		ctx.patchState({
			code: newCode
		});

		return;
	}

	@Action(ResetCode)
	reset(ctx: StateContext<KeycodeModel>) {
		ctx.patchState({
			code: ''
		});
	}

	@Selector() static getCode(state: KeycodeModel) {
		return state.code;
	}
}
