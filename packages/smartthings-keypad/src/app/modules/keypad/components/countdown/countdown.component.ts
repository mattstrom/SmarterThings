import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SecuritySystemService } from '../../../../services';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/interval';

@Component({
	selector: 'countdown',
	templateUrl: './countdown.component.html',
	styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
	private timer$: Observable<number | string>;

	constructor(private securitySystem: SecuritySystemService) { }

	ngOnInit() {
		this.timer$ = this.securitySystem.countdown$
			.switchMap((countdown) => {
				if (countdown === null) {
					return Observable.of('');
				}

				return Observable.interval(1000)
					.take(countdown + 1)
					.map((value) => countdown - value);
			});
	}
}
