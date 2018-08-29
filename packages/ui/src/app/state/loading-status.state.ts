import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetLoadingStatus } from './loading-status.actions';


export interface LoadingStatusModel {
	loading: boolean;
}

@State<LoadingStatusModel>({
	name: 'getStatus',
	defaults: {
		loading: false
	}
})
export class LoadingStatus {

	@Action(SetLoadingStatus)
	setLoadingStatus(
		{ patchState }: StateContext<LoadingStatusModel>,
		{ payload }: SetLoadingStatus
	) {
		patchState({ loading: payload });
	}

	@Selector() static getStatus(state: LoadingStatusModel) {
		return state.loading;
	}
}
