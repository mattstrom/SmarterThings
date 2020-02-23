import { Component } from '@angular/core';
import { Weather } from '../../state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';


@Component({
	selector: 'smt-hourly-forecast',
	templateUrl: './hourly-forecast.component.html',
	styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent {
	@Select(Weather.getHourlyForecast)
	forecast$: Observable<any[]>;
}
