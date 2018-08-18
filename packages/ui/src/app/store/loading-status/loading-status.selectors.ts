import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../index';


const getLoadingStatus = createSelector(
	(state: State) => state.loadingStatus.loading
);

export const loadingStatusQuery = {
	getLoadingStatus
};
