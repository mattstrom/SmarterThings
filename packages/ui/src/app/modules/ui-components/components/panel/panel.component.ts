import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'smt-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
	@Input() title: string;

	constructor() {
	}

	ngOnInit() {
	}

}
