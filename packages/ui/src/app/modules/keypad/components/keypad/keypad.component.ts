import { AfterViewInit, Component, OnInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { KeycodeService } from '../../services';
import { KeypadButtonComponent } from '../keypad-button/keypad-button.component';


@Component({
	selector: 'numpad',
	templateUrl: './keypad.component.html',
	styleUrls: ['./keypad.component.scss']
})
export class NumpadComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChildren(KeypadButtonComponent) buttons: QueryList<KeypadButtonComponent>;

	private subscriptions: Subscription[];

	constructor(private keycodeService: KeycodeService) { }

	ngOnInit() {
		fromEvent(document, 'keypress')
			.pipe(
				filter((event: KeyboardEvent) => {
					return event.keyCode >= 48 && event.keyCode <= 57;
				}),
				map((event: KeyboardEvent) => event.keyCode - 48)
			)
			.subscribe((value: number) => {
				this.keycodeService.input$.next(value.toString());
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
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}

	onClick(key: string) {
		this.keycodeService.input$.next(key);
	}
}
