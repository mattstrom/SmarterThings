import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { IdentityService } from './index';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/window';
import 'rxjs/add/operator/withLatestFrom';


@Injectable()
export class KeycodeService {
	readonly input$ = new Subject<string>();
	readonly code$ = new BehaviorSubject<string>('');

	readonly disarm$ = new Subject<void>();
	readonly counter$ = new Subject<number>();
	readonly reset$ = new BehaviorSubject<void>(null);

	constructor(
		private http: Http,
		private identityService: IdentityService
	) {
		Observable
			.merge(
				this.reset$.startWith(null).mapTo(''),
				this.input$
			)
			.scan((accumulator: string, value: string) => {
				if (value === '') {
					return '';
				}

				return (accumulator.length < 4)
					? accumulator + value
					: accumulator;
			}, '')
			.multicast(this.code$)
			.connect();
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
