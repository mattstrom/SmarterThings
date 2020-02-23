import { Component, OnInit, OnDestroy } from '@angular/core';
import { HourlyForecast, Weather } from '../../state';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { getIconUrl } from '../../utils';


@Component({
	selector: 'smt-weather',
	templateUrl: './weather.component.html',
	styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
	@Select(Weather.getCurrentWeather)
	forecast$: Observable<HourlyForecast>;

	public weather: HourlyForecast | null = null;
	public iconUrl: string = '';

	private subscription: Subscription;

	ngOnInit() {
		this.subscription = this.forecast$.subscribe((forecast) => {
			this.weather = forecast;
			this.iconUrl = (forecast)
				? getIconUrl(forecast.icon, true)
				: '';
		});
	}

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
			this.subscription = null;
		}
	}
}

