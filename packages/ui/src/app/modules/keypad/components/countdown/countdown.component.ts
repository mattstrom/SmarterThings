import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ResetCountdown, SecuritySystem } from '../../../../state';


@Component({
	selector: 'smt-countdown',
	templateUrl: './countdown.component.html',
	styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
	public percentage$: Observable<number>;

	@Select(SecuritySystem.getColor)
	color$: Observable<number>;

	@Select(SecuritySystem.getCountdown)
	countdown$: Observable<number>;

	private duration: number = 300;

	constructor(private readonly store: Store) {}

	ngOnInit() {
		this.percentage$ = this.countdown$.pipe(
			filter(timer => timer !== null),
			map(timer => 100 * timer / this.duration)
		);
	}

	ngOnDestroy() {
		this.store.dispatch(new ResetCountdown());
	}
}
