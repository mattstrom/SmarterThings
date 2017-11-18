import * as express from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';

import TYPES from '../di/types';


@controller('')
@injectable()
export class MainController {

	constructor() { }

	@httpGet('/')
	private index( @response() res: express.Response) {
		res.render('index');
	}
}
