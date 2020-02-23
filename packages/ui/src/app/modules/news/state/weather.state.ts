import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { groupBy } from 'lodash-es';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { ApiUrlToken } from '../../../tokens';
import { Forecast } from './types';
import { RefreshWeather } from './weather.actions';


export interface DailyForecast {
	dayOfWeek: string;
	temperature: { min: number, max: number };
	icon: string;
}

export interface HourlyForecast {
	dayOfWeek: string;
	timeOfDay: string;
	temperature: {
		current: number;
		min: number;
		max: number;
	};
	icon: string;
}

export interface WeatherModel {
	forecastData: Forecast | null;
}

@State<WeatherModel>({
	name: 'weather',
	defaults: {
		forecastData: null
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
		const url = new URL('https://api.openweathermap.org/data/2.5/forecast');

		url.searchParams.append('APPID', environment.openWeatherMapApiKey);
		url.searchParams.append('zip', environment.zipCode);
		url.searchParams.append('mode', 'json');
		url.searchParams.append('units', 'imperial');

		return this.http.get<Forecast>(`${url.toString()}`)
			.pipe(
				tap(forecastData => {
					patchState({ forecastData });
				})
			);
	}

	@Selector() static getCity(state: WeatherModel) {
		return state.forecastData.city.name;
	}

	@Selector() static getCurrentWeather(state: WeatherModel) {
		const { list } = state.forecastData;
		const hour = list[0];

		const dow = moment(hour.dt * 1_000).utc().format('ddd');
		const timeOfDay = moment(hour.dt * 1_000).utc().format('hhpp');

		return {
			dayOfWeek: dow,
			timeOfDay,
			temperature: {
				current: hour.main.temp,
				min: hour.main.temp_min,
				max: hour.main.temp_max
			},
			icon: hour.weather[0].icon
		} as HourlyForecast;
	}

	@Selector() static getForecast(state: WeatherModel) {
		const { list } = state.forecastData;
		const groups = groupBy(list, (item) => item.dt_txt.slice(0, 10));

		return Object.entries(groups)
			.map(entry => {
				const [, group] = entry;
				const day = group[0];
				const dow = moment(day.dt * 1_000).utc().format('ddd');

				return {
					dayOfWeek: dow,
					temperature: {
						current: day.main.temp,
						min: day.main.temp_min,
						max: day.main.temp_max
					},
					icon: day.weather[0].icon
				} as DailyForecast;
			})
			.slice(0, 5);
	}

	@Selector() static getHourlyForecast(state: WeatherModel) {
		const { list } = state.forecastData;
		const groups = groupBy(list, (item) => item.dt_txt.slice(0, 10));

		return list.slice(0, 5)
			.map(hour => {
				const dow = moment(hour.dt * 1_000).utc().format('ddd');
				const timeOfDay = moment(hour.dt * 1_000).utc().format('hhpp');

				return {
					dayOfWeek: dow,
					timeOfDay,
					temperature: {
						current: hour.main.temp,
						min: hour.main.temp_min,
						max: hour.main.temp_max
					},
					icon: hour.weather[0].icon
				} as HourlyForecast;
			});
	}
}

function getDayOfWeek() {}
