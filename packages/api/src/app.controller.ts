import { Controller, Get, Response } from '@nestjs/common';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

@Controller()
export class AppController {

	constructor() {}

	@Get('/ping')
	private ping( @Response() res: express.Response) {
		res.sendStatus(HttpStatus.NO_CONTENT);
	}
}
