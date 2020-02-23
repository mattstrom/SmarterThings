import { Component, OnInit, Input } from '@angular/core';

import { DailyForecast } from '../../state';
import { getIconUrl } from '../../utils';


@Component({
	selector: 'smt-forecast-tile',
	templateUrl: './forecast-tile.component.html',
	styleUrls: ['./forecast-tile.component.scss']
})
export class ForecastTileComponent implements OnInit {
	@Input() forecast: DailyForecast;

	iconUrl: string = '';

	constructor() {}

	ngOnInit() {
		this.iconUrl = getIconUrl(this.forecast.icon);
	}
}
