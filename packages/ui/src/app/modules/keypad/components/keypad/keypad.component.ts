import { AfterViewInit, Component, OnInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Blop } from '../../../../utils/sound';
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
				const key = value.toString();

				this.playSound(key);
				this.keycodeService.input$.next(key);
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
		this.playSound(key);
		this.keycodeService.input$.next(key);
	}

	private playSound(value: string) {
		const blop = new Blop(new AudioContext(), 0.005);
		blop.start(0.01);
	}
}
