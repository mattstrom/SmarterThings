import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'smt-silent-button',
	templateUrl: './silent-button.component.html',
	styleUrls: ['./silent-button.component.scss']
})
export class SilentButtonComponent {
	@Input() color: string = 'default';
	@Output() click = new EventEmitter<Event>();
	@Output() silentClick = new EventEmitter<Event>();

	constructor() {}

	onClick = (event: Event) => {
		this.click.emit(event);
	}

	onSilentClick = (event: Event) => {
		this.silentClick.emit(event);
	}
}
