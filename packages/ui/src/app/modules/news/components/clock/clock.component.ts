import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
	selector: 'smt-clock',
	templateUrl: './clock.component.html',
	styleUrls: ['./clock.component.scss']
})
export class ClockComponent {
	public time$: Observable<Date>;

	constructor() {
		this.time$ = interval(1000).pipe(
			startWith(new Date()),
			map(() => new Date())
		);
	}
}
