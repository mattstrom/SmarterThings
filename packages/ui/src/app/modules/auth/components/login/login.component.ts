import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { Credentials } from '../../models';
import { AuthService } from '../../services';


export class LoginViewModel {
	credentials: Credentials = new Credentials();
}

@Component({
	selector: 'smt-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	model: LoginViewModel = new LoginViewModel();
	authenticating = new BehaviorSubject<boolean>(false);

	private redirectUrl: string;

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/home';
	}

	ngOnInit() {
	}

	onLogIn = () => {
		this.authenticating.next(true);
		this.authService.login(this.model.credentials)
			.pipe(take(1))
			.subscribe(
				(authenticated: boolean) => {
					this.authenticating.next(false);

					if (authenticated) {
						this.router.navigateByUrl(this.redirectUrl);
					}
				},
				(err) => {
					this.authenticating.next(false);
				}
			);
	}
}
