import { Action } from '@ngrx/store';


export enum LoadingStatusActionTypes {
	SetLoadingStatus = '[LoadingStatus] Set Loading Status'
}

export class SetLoadingStatus implements Action {
	readonly type = LoadingStatusActionTypes.SetLoadingStatus;

	constructor(public payload: boolean) {}
}

export type LoadingStatusActions
	= SetLoadingStatus;
