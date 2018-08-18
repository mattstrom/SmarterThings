import { Action } from '@ngrx/store';
import { LoadingStatusActions, LoadingStatusActionTypes } from './loading-status.actions';

export interface State {
	loading: boolean;
}

export const initialState: State = {
	loading: false
};

export function reducer(state = initialState, action: LoadingStatusActions): State {
	switch (action.type) {
		case LoadingStatusActionTypes.SetLoadingStatus: {
			return {
				...state,
				loading: action.payload
			};
		}
		default: {
			return state;
		}
	}
}
