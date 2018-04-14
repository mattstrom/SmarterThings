import * as express from 'express';
import { Db } from 'mongodb';
import { inject, injectable } from 'inversify';
import * as request from 'request';
import {
	requestBody,
	controller,
	httpGet,
	httpPost,
	httpPut,
	queryParam,
	request as Request,
	response as Response
} from 'inversify-express-utils';

import TYPES from '../di/types';
import { ServerModel } from '../models';
import { WebSocketService } from '../services';
import { AuthService } from '../services/auth';


@controller('/security')
@injectable()
export class SecuritySystemController {
	@inject(TYPES.AuthService) authService: AuthService;
	@inject(TYPES.TokenHost) smartThingsUri: string;
	@inject(TYPES.WebSocketService) webSocketService: WebSocketService;

	constructor(
		@inject(TYPES.ServerId) private serverId: string,
		@inject(TYPES.MongoDB) private db: Promise<Db>
	) { }

	@httpPost('/message')
	private async sendMessage( @requestBody() body: any, @Request() req: express.Request, @Response() res: express.Response) {
		const message = body.message;

		try {
			await this.webSocketService.send(message);

			res.sendStatus(200);
		} catch (e) {
			res.sendStatus(400);
		}
	}

	@httpPost('/status')
	private async getStatus(@requestBody() body: boolean, @Response() res: express.Response) {
		const clientId = body['clientId'];
		const server = await ServerModel.findOne({
			serverId: this.serverId
		});

		if (!server) {
			res.sendStatus(400);
			return;
		}

		const url = `${this.smartThingsUri}${server.token[0].accessUrl}/status`;
		const options: request.CoreOptions = {
			headers: {
				Authorization: `Bearer ${server.token[0].authToken}`,
				'Content-Type': 'application/json'
			}
		};

		request.get(url, options).pipe(res);
	}

	@httpPut('/status')
	private async updateStatus(@requestBody() body, @Request() req: express.Request, @Response() res: express.Response) {
		const message = {
			action: 'updateStatus',
			data: body
		};

		try {
			await this.webSocketService.send(message);

			res.sendStatus(200);
		} catch (e) {
			res.sendStatus(400);
		}
	}

	@httpPost('/startCountdown')
	private async intrusion( @requestBody() body: any, @Request() req: express.Request, @Response() res: express.Response) {
		const message = {
			action: 'startCountdown',
			data: body
		};

		try {
			await this.webSocketService.send(message);

			res.sendStatus(200);
		} catch (e) {
			res.sendStatus(400);
		}
	}

	@httpPut('/arm')
	private async arm(@requestBody() body: any, @Request() req: express.Request, @Response() res: express.Response) {
		const clientId = body['clientId'];
		const server = await ServerModel.findOne({
			serverId: this.serverId
		});

		if (!server) {
			res.sendStatus(400);
			return;
		}

		const url = `${this.smartThingsUri}${server.token[0].accessUrl}/arm`;
		const options: request.CoreOptions = {
			headers: {
				Authorization: `Bearer ${server.token[0].authToken}`,
				'Content-Type': 'application/json'
			}
		};

		request.put(url, options).pipe(res);
	}

	@httpPut('/disarm')
	private async disarm(@requestBody() body: any, @Request() req: express.Request, @Response() res: express.Response) {
		const clientId = body['clientId'];
		const server = await ServerModel.findOne({
			serverId: this.serverId
		});

		if (!server) {
			res.sendStatus(400);
			return;
		}

		const url = `${this.smartThingsUri}${server.token[0].accessUrl}/disarm`;
		const payload = {
			securityCode: body['securityCode']
		};

		const options: request.CoreOptions = {
			headers: {
				Authorization: `Bearer ${server.token[0].authToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		};

		request.put(url, options).pipe(res);
	}
}
