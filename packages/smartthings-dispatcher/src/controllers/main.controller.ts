import * as express from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost, request, requestBody, response, queryParam } from 'inversify-express-utils';
import * as HttpStatus from 'http-status-codes';
import * as request2 from 'request';
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts';
import * as Url from 'url';

import TYPES from '../di/types';
import { NotAuthenticatedError } from '../errors';
import { User, UserModel, Credentials } from '../models';
import { AuthService } from '../services/auth';

@ApiPath({
    path: "/",
    name: "Main",
    security: { basicAuth: [] }
})
@controller('')
@injectable()
export class MainController {
	@inject(TYPES.RedirectUrl) redirectUrl: string;
	@inject(TYPES.AuthService) authService: AuthService;

	constructor() { }

	@ApiOperationGet({
        description: "Get versions objects list",
        summary: "Get versions list",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Version" }
        },
        security: {
            apiKeyHeader: []
        }
    })
	@httpGet('/ping')
	private index(@response() res: express.Response) {
		res.sendStatus(HttpStatus.NO_CONTENT);
	}
}
