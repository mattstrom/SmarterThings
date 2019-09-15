import { Controller, Get } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
// import { AppData } from './modules/smart-app/models';

@Controller('app')
export class AppController {

	constructor() {}

	@Get('')
	async get() {
		const payload = await import('./payload.json');
		// const cls = plainToClass(AppData, payload);
		const cls = {};

		return cls;
	}
}
