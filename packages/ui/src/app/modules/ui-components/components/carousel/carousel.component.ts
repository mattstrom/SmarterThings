import { Component, ContentChildren, OnInit, QueryList, AfterContentInit, Input } from '@angular/core';
import { interval, Observable, concat, of, BehaviorSubject } from 'rxjs';
import { combineLatest, map, startWith } from 'rxjs/operators';

import { CarouselPanelDirective } from './carousel-panel.directive';


@Component({
	selector: 'smt-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterContentInit {
	@Input() duration?: number = 10_000;

	public currentPanel$: Observable<CarouselPanelDirective>;

	private currentIndex$: Observable<number>;
	private offset$ = new BehaviorSubject<number>(0);

	@ContentChildren(CarouselPanelDirective)
	panels: QueryList<CarouselPanelDirective>;

	constructor() {}

	ngAfterContentInit(): void {
		this.currentIndex$ = concat(
			of(0),
			interval(this.duration).pipe(map(i => i + 1))
		).pipe(
			combineLatest(
				this.offset$,
				(step, offset) => {
					return step + offset;
				}
			),
			map(index => {
				return index % this.panels.length;
			})
		);

		this.currentPanel$ = this.currentIndex$.pipe(
			map(currentIndex => {
				return this.panels
					.find((item, index) => currentIndex === index);
			})
		);
	}

	onAdvance = () => {
		this.offset$.next(this.offset$.getValue() + 1);
	}
}
