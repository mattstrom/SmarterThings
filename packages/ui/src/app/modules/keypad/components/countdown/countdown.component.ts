import { Component, OnInit } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { SecuritySystemService } from '../../services';


@Component({
	selector: 'countdown',
	templateUrl: './countdown.component.html',
	styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
	public timer$: Observable<number>;

	constructor(private securitySystem: SecuritySystemService) { }

	ngOnInit() {
		this.timer$ = this.securitySystem.countdown$
			.pipe(
				switchMap((countdown: number) => {
					if (countdown === null) {
						return of('');
					}

					return interval(1000).pipe(
						take(countdown + 1),
						map((value) => countdown - value)
					);
				})
			);
	}
}
