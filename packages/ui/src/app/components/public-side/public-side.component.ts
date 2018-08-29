import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadingStatus } from '../../state';
import { State } from '../../store';
import { loadingStatusQuery } from '../../store/loading-status/loading-status.selectors';

@Component({
	selector: 'smt-public-side',
	templateUrl: './public-side.component.html',
	styleUrls: ['./public-side.component.scss']
})
export class PublicSideComponent {
	@Select(LoadingStatus.getStatus)
	public loading$: Observable<boolean>;

	constructor() {
		//this.loading$ = this.store.pipe(select(loadingStatusQuery.getLoadingStatus));
	}
}
