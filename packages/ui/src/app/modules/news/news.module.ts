import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { UiComponentsModule } from '../ui-components';
import { ClockComponent } from './components/clock/clock.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { NewsComponent } from './components/news/news.component';
import { ForecastTileComponent } from './components/forecast-tile/forecast-tile.component';


@NgModule({
	declarations: [
		ClockComponent,
		ForecastComponent,
		NewsComponent,
		ForecastTileComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		UiComponentsModule
	],
	exports: [
		ClockComponent,
		ForecastComponent,
		NewsComponent
	],
	providers: []
})
export class NewsModule { }
