import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[smt-carousel-panel]'
})
export class CarouselPanelDirective {
	constructor(public templateRef: TemplateRef<any>) {}
}
