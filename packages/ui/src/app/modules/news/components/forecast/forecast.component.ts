import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'smt-forecast',
	templateUrl: './forecast.component.html',
	styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

	public location: string = 'Concord';
	public items = new Array(5).fill(0);

	constructor() {
	}

	ngOnInit() {
	}
}
