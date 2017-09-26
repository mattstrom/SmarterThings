import * as express from 'express';
import { inject, injectable } from 'inversify';
import * as request from 'request';
import {
	controller,
	httpGet,
	httpPost,
	request as Request,
	response as Response
} from 'inversify-express-utils';

import TYPES from '../di/types';


// "clientId": "4575516e-9fa6-4c25-bd72-bb5884a3643f",
// "clientSecret": "4c95f6a1-0365-46fd-9ebd-763ad0465e23"

@controller('/trigger')
@injectable()
export class TriggerController {

	constructor() { }

	@httpGet('/event')
	private event(@Request() req: express.Request, @Response() res: express.Response) {
		const baseUrl = `http://graph-na04-useast2.api.smartthings.com/api/smartapps/installations/56dc81a9-b79e-4679-934d-6cd99c35200f`;
		let url: string;

		if (req.query['trigger_by_type'] === 'pir-motion') {
			url = `${baseUrl}/trigger/motion`;
		} else if (req.query['trigger_by_type'] === 'audio') {
			url = `${baseUrl}/trigger/audio`;
		} else {
			res.sendStatus(400);
		}

		const options: request.CoreOptions = {
			headers: {
				Authorization: 'Bearer e29cb2fa-7ff1-4b3d-b186-587e7b2d21f8',
				'Content-Type': 'application/json'
			}
		};

		request.get(url, options).pipe(res);
	}

	@httpPost('/motion')
	private motion( @Request() req: express.Request, @Response() res: express.Response) {
		const baseUrl = `http://graph-na04-useast2.api.smartthings.com/api/smartapps/installations/367a2a48-d44f-4145-8914-6359e7a3091d`;
		const url = `${baseUrl}/trigger?trigger_by_type=pir-motion`;
		const payload = {
			trigger_by_type: 'pir-motion'
		};
		const options: request.CoreOptions = {
			headers: {
				Authorization: 'Bearer 435bcfa8-df92-4fd3-b331-81f5fef7b44f',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		};

		request.get(url, options).pipe(res);
	}
}
