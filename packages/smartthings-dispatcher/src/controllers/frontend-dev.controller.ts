import * as express from 'express';
import * as proxy from 'express-proxy-middleware';
import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost, request, requestBody, response, queryParam } from 'inversify-express-utils';
import * as Request from 'request';
import * as Url from 'url';

import TYPES from '../di/types';


@controller('')
@injectable()
export class FrontendDevController {
	@inject(TYPES.Mode) mode: string;

	constructor() {}

	@httpGet('*')
	//@httpGet('*', proxy('http://localhost:4200'))
	private index( @request() req: express.Request, @response() res: express.Response) {}
}
