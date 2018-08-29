import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadingStatus } from '../../state';

@Component({
	selector: 'smt-public-side',
	templateUrl: './public-side.component.html',
	styleUrls: ['./public-side.component.scss']
})
export class PublicSideComponent {
	@Select(LoadingStatus.getStatus)
	public loading$: Observable<boolean>;

	constructor() {}
}
