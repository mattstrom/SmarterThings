import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { URL } from 'url';
import { Sensor } from '../models';

import { ApiUrlToken } from '../tokens';
import { RefreshWeather } from './weather.actions';


export interface WeatherModel {
	location: string;
	forecast: any[];
}

@State<WeatherModel>({
	name: 'weather',
	defaults: {
		location: '',
		forecast: []
	}
})
export class Weather implements NgxsOnInit {

	constructor(
		private readonly http: HttpClient,
		@Inject(ApiUrlToken) private readonly apiUrl: string
	) {}

	ngxsOnInit(ctx: StateContext<WeatherModel>) {
		ctx.dispatch(new RefreshWeather());
	}

	@Action(RefreshWeather)
	getWeather({ patchState }: StateContext<WeatherModel>) {
		const url = new URL('https://api.openweathermap.org/data/2.5/forecast?q=concord,ca,us&mode=json&appid=7aed375809b0524be6dc0daf83ba9ade');
		url.searchParams.append('q', 'concord,ca,us');
		url.searchParams.append('mode', 'json');
		url.searchParams.append('appid', 'b774b7fe224be007c9bd46c2986fce54');

		this.http.get(`${url.toString()}`)
			.pipe(
				tap(data => {

				})
			);

		// this.http.get(`${this.apiUrl}/security/weather`)
		// 	.subscribe((weather: Sensor[]) => {
		// 		patchState({
		// 			forecast: weather
		// 		});
		// 	});
	}

	@Selector() static getWeather(state: WeatherModel) {
		return state.forecast;
	}

}
