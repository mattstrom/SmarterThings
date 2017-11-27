import * as express from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost, request, requestBody, response, queryParam } from 'inversify-express-utils';
import * as path from 'path';
import * as Request from 'request';
import * as Url from 'url';

import TYPES from '../di/types';


@controller('/')
@injectable()
export class FrontendController {
	@inject(TYPES.Mode) mode: string;

	constructor() { }

	@httpGet('*', express.static(path.join(__dirname, '../../../smartthings-keypad/dist')))
	private index() {}
}
