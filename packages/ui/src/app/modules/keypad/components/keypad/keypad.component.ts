import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, OnInit, OnDestroy, QueryList, ViewChildren, Inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { fromEvent, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { PressKey } from '../../../../state';
import { Blop } from '../../../../utils/sound';
import { KeypadButtonComponent } from '../keypad-button/keypad-button.component';


@Component({
	selector: 'smt-numpad',
	templateUrl: './keypad.component.html',
	styleUrls: ['./keypad.component.scss']
})
export class NumpadComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChildren(KeypadButtonComponent) buttons: QueryList<KeypadButtonComponent>;

	private subscription: Subscription;
	private subscriptions: Subscription[];

	constructor(
		private readonly store: Store,
		@Inject(DOCUMENT) private readonly document: Document
	) { }

	ngOnInit() {
		this.subscription = fromEvent(this.document, 'keypress')
			.pipe(
				filter((event: KeyboardEvent) => {
					return event.keyCode >= 48 && event.keyCode <= 57;
				}),
				map((event: KeyboardEvent) => event.keyCode - 48)
			)
			.subscribe((value: number) => {
				const key = value.toString();

				this.playSound(key);
				this.store.dispatch(new PressKey(key));
			});
	}

	ngAfterViewInit() {
		this.subscriptions = this.buttons.map((button) => {
			return button.clicked.subscribe(() => {
				this.onClick(button.action);
			});
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}

	onClick(key: string) {
		this.playSound(key);
		this.store.dispatch(new PressKey(key));
	}

	private playSound(value: string) {
		const blop = new Blop(new AudioContext(), 0.005);
		blop.start(0.01);
	}
}
