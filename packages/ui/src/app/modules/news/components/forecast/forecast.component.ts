import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Weather } from '../../state';
import { map } from 'rxjs/operators';


@Component({
	selector: 'smt-forecast',
	templateUrl: './forecast.component.html',
	styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
	@Select(Weather.getForecast)
	forecast$: Observable<any[]>;

	constructor() {}
}
