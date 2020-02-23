import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { UiComponentsModule } from '../ui-components';
import { ClockComponent } from './components/clock/clock.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { NewsComponent } from './components/news/news.component';
import { ForecastTileComponent } from './components/forecast-tile/forecast-tile.component';
import { Weather } from './state';
import { WeatherComponent } from './components/weather/weather.component';
import { RotatingPanelComponent } from './components/rotating-panel/rotating-panel.component';
import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';


@NgModule({
	declarations: [
		ClockComponent,
		ForecastComponent,
		NewsComponent,
		ForecastTileComponent,
		WeatherComponent,
		RotatingPanelComponent,
		HourlyForecastComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		UiComponentsModule,
		NgxsModule.forFeature([
			Weather
		])
	],
	exports: [
		ClockComponent,
		ForecastComponent,
		NewsComponent
	],
	providers: []
})
export class NewsModule { }
