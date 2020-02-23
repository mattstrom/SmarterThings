import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services';

@Component({
	selector: 'smt-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

	constructor(public readonly authService: AuthService) {}
}
