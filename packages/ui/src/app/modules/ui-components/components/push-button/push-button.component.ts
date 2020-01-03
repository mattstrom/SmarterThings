import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
	selector: 'smt-push-button',
	templateUrl: './push-button.component.html',
	styleUrls: ['./push-button.component.scss']
})
export class PushButtonComponent {
	@Input() text: string;
	@Input() icon: string;
	@Input() routerLink?: any[];

	@Output() click = new EventEmitter<void>();

	constructor(private readonly router: Router) {}

	onClick = () => {
		if (this.routerLink) {
			this.router.navigate(this.routerLink);
		} else {
			this.click.emit();
		}
	}
}
