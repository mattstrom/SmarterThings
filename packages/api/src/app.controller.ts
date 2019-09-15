import { Controller, Get, Response } from '@nestjs/common';
import { OK } from 'http-status-codes';

@Controller()
export class AppController {

	constructor() {}

	@Get('ping')
	async get(@Response() res) {
		res.statusCode = OK;
		res.send();
	}
}
