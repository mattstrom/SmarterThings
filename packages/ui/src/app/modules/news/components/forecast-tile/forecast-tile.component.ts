import { Component, OnInit, Input } from '@angular/core';


@Component({
	selector: 'smt-forecast-tile',
	templateUrl: './forecast-tile.component.html',
	styleUrls: ['./forecast-tile.component.scss']
})
export class ForecastTileComponent implements OnInit {
	@Input() day: string;

	constructor() {
	}

	ngOnInit() {
	}

}
