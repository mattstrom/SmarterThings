import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


const up$ = Observable.merge(
	Observable.fromEvent(document, 'mouseup'),
	Observable.fromEvent(document, 'touchend')
);

@Component({
	selector: 'keypad-button',
	templateUrl: './keypad-button.component.html',
	styleUrls: ['./keypad-button.component.scss']
})
export class KeypadButtonComponent implements OnInit {
	@Input() action: string;
	@Output() clicked = new EventEmitter<string>();

	private pressed$: Observable<boolean>;

	constructor(private elementRef: ElementRef) { }

	ngOnInit() {
		const element = this.elementRef.nativeElement;

		const down$ = Observable.merge(
			Observable.fromEvent(element, 'mousedown'),
			Observable.fromEvent(element, 'touchstart')
		);

		this.pressed$ = Observable
			.merge(
				down$.mapTo(true),
				up$.mapTo(false)
			);
	}

	onClick(event: MouseEvent) {
		this.clicked.emit(this.action);
	}
}
