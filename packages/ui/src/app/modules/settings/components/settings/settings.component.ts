import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
	selector: 'smt-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

	constructor(
		private readonly route: ActivatedRoute,
		private readonly router: Router
	) {}

	onClick = () => {
		this.router.navigate(['..'], { relativeTo: this.route });
	}
}
