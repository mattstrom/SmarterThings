import * as express from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';

import TYPES from '../di/types';


@controller('')
@injectable()
export class WildcardController {

	constructor() { }

	@httpGet('*')
	@httpPost('*')
	private wildcard( @response() res: express.Response) {
		const pojo = { status: 404, message: 'No Content' };
		const json = JSON.stringify(pojo, null, 2);

		res.setHeader('Content-Type', 'application/json');
		res.status(404).send(json);
	}
}
