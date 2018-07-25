import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { Credentials } from '../../models';
import { AuthService } from '../../services';


export class RegisterViewModel {
	credentials: Credentials = new Credentials();
}

@Component({
	selector: 'smt-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	model: RegisterViewModel = new RegisterViewModel();
	authenticating = new BehaviorSubject<boolean>(false);

	private redirectUrl: string;

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/keypad';
	}

	onRegister = () => {
		this.authenticating.next(true);
		this.authService.register(this.model.credentials)
			.pipe(take(1))
			.subscribe((authenticated: boolean) => {
				this.authenticating.next(false);

				if (authenticated) {
					this.router.navigateByUrl(this.redirectUrl);
				}
			});
	}
}
