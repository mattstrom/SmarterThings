import { Injectable } from '@angular/core';
import { BehaviorSubject, ConnectableObservable, merge, Observable, Subject } from 'rxjs';
import { mapTo, multicast, scan, startWith } from 'rxjs/operators';

import { IdentityService } from './index';


@Injectable()
export class KeycodeService {
	readonly input$ = new Subject<string>();
	readonly code$ = new BehaviorSubject<string>('');

	readonly disarm$ = new Subject<void>();
	readonly counter$ = new Subject<number>();
	readonly reset$ = new BehaviorSubject<void>(null);

	constructor(private identityService: IdentityService) {
		const obs = merge(
			this.reset$.pipe(
				startWith(null),
				mapTo('')
			),
			this.input$
		).pipe(
			scan((accumulator: string, value: string) => {
				if (value === '') {
					return '';
				}

				return (accumulator.length < 4)
					? accumulator + value
					: accumulator;
			}, ''),
			multicast(this.code$)
		) as ConnectableObservable<string>;

		obs.connect();
	}

	checkKeycode(code: string): Promise<boolean> {
		return Promise.resolve(false);
	}

	pressKey(key: string) {
		this.input$.next(key);
	}

	clearCode() {
		this.reset$.next(null);
	}
}
