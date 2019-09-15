import { Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';
import * as request from 'request';

import config from '../configuration';


@Controller('trigger')
@UseGuards(AuthGuard('jwt'))
export class TriggerController {

	constructor() {}

	@Get('/event')
	private event(
		@Request() req: express.Request,
		@Response() res: express.Response
	) {
		const baseUrl = config.smartthings.tokenHost;
		let url: string;

		if (req.query.trigger_by_type === 'pir-motion') {
			url = `${baseUrl}/trigger/motion`;
		} else if (req.query.trigger_by_type === 'audio') {
			url = `${baseUrl}/trigger/audio`;
		} else {
			res.sendStatus(400);
		}

		const options: request.CoreOptions = {
			headers: {
				'Authorization': 'Bearer 435bcfa8-df92-4fd3-b331-81f5fef7b44f',
				'Content-Type': 'application/json'
			}
		};

		request.get(url, options).pipe(res);
	}

	@Post('/motion')
	private motion(
		@Request() req: express.Request,
		@Response() res: express.Response
	) {
		const baseUrl = `http://graph-na04-useast2.api.smartthings.com/api/smartapps/installations/367a2a48-d44f-4145-8914-6359e7a3091d`;
		const url = `${baseUrl}/trigger?trigger_by_type=pir-motion`;
		const payload = {
			trigger_by_type: 'pir-motion'
		};
		const options: request.CoreOptions = {
			headers: {
				'Authorization': 'Bearer 435bcfa8-df92-4fd3-b331-81f5fef7b44f',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		};

		request.get(url, options).pipe(res);
	}
}
