import * as express from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost, request, requestBody, response, queryParam } from 'inversify-express-utils';
import * as Request from 'request';
import * as Url from 'url';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';

import TYPES from '../di/types';

const config = require('../../../smartthings-keypad/webpack.config');

const compiler = webpack(config);
const webpackMiddleware = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
});

@controller('')
@injectable()
export class FrontendDevController {
	@inject(TYPES.Mode) mode: string;

	constructor() {}

	@httpGet('*', webpackDevMiddleware)
	private index( @request() req: express.Request, @response() res: express.Response) {}
}
