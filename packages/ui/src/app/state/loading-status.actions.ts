
export class SetLoadingStatus {
	static readonly type = '[LoadingStatus] Set Loading Status';

	constructor(public payload: boolean) {}
}
