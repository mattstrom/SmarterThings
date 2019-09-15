import { formatNumber } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'timer'
})
export class TimerPipe implements PipeTransform {

	constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

	transform(value: any, period: number = 100): any {
		const time = new Date(value * period);
		const minutes = formatNumber(time.getMinutes(), this.locale, '2.0-0');
		const seconds = formatNumber(time.getSeconds(), this.locale, '2.0-0');

		return `${minutes}:${seconds}`;
	}
}
