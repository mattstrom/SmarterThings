import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';


const up$ = merge(
	fromEvent(document, 'mouseup'),
	fromEvent(document, 'touchend')
);

@Component({
	selector: 'keypad-button',
	templateUrl: './keypad-button.component.html',
	styleUrls: ['./keypad-button.component.scss']
})
export class KeypadButtonComponent implements OnInit {
	@Input() action: string;
	@Output() clicked = new EventEmitter<string>();

	public pressed$: Observable<boolean>;

	constructor(private elementRef: ElementRef) { }

	ngOnInit() {
		const element = this.elementRef.nativeElement;

		const down$ = merge(
			fromEvent(element, 'mousedown'),
			fromEvent(element, 'touchstart')
		);

		this.pressed$ = merge(
			down$.pipe(mapTo(true)),
			up$.pipe(mapTo(false))
		);
	}

	onClick(event: MouseEvent) {
		this.clicked.emit(this.action);
	}
}
