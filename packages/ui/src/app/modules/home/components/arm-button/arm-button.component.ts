import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
	selector: 'smt-arm-button',
	templateUrl: './arm-button.component.html',
	styleUrls: ['./arm-button.component.scss']
})
export class ArmButtonComponent {
	@Input() text: string;
	@Input() icon: string;

	@Output() click = new EventEmitter<void>();
}
