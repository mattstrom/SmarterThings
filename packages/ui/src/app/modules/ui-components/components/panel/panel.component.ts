import { Component, Input, OnInit, ContentChild } from '@angular/core';
import { PanelHeaderComponent } from './panel-header.component';

@Component({
	selector: 'smt-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
	@Input() title?: string | undefined;

	@ContentChild(PanelHeaderComponent, { static: true })
	header: PanelHeaderComponent;

	constructor() {}

	ngOnInit() {}
}
