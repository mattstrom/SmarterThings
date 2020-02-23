import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Weather } from '../../state';


@Component({
	selector: 'smt-rotating-panel',
	templateUrl: './rotating-panel.component.html',
	styleUrls: ['./rotating-panel.component.scss']
})
export class RotatingPanelComponent {
	@Input() title: string;

	@Select(Weather.getCity)
	location$: Observable<string>;

	city$: Observable<string> = this.location$.pipe(
		map(location => location || 'Retrieving location...')
	);

	constructor() {}
}
