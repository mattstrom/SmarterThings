import {
	ActionReducer,
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
	MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromLoadingStatus from './loading-status/loading-status.reducer';


export interface State {
	loadingStatus: fromLoadingStatus.State;
}

export const reducers: ActionReducerMap<State> = {
	loadingStatus: fromLoadingStatus.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
