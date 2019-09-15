import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Inject, Param,
	Post,
	Put,
	Request,
	Response,
	UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as request from 'request';
import { EntityManager } from 'typeorm';

import config from '../configuration';
import { Server } from '../entities';
import { EventsGateway } from '../services';


@Controller('security')
export class SecuritySystemController {

	constructor(
		private gateway: EventsGateway,
		private entityManager: EntityManager
	) { }

	@Post('/message')
	async sendMessage(
		@Body() body: any,
		@Response() res: express.Response
	) {
		const message = body.message;

		try {
			await this.gateway.send(message);

			res.sendStatus(200);
		} catch (e) {
			res.sendStatus(400);
		}
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('/status')
	async getStatus(@Body() body: any, @Response() res: express.Response) {
		const server = await this.entityManager.findOne(Server, {});

		if (!server) {
			throw new BadRequestException();
		}

		const url = `${config.smartthings.tokenHost}${server.token.accessUrl}/status`;
		const options: request.CoreOptions = {
			headers: {
				'Authorization': `Bearer ${server.token.authToken}`,
				'Content-Type': 'application/json'
			}
		};

		request.get(url, options).pipe(res);
	}

	@Put('/status')
	private async updateStatus(@Body() body: any, @Request() req: express.Request, @Response() res: express.Response) {
		const message = {
			action: 'updateStatus',
			data: body
		};

		try {
			await this.gateway.send(message);

			res.sendStatus(HttpStatus.OK);
		} catch (e) {
			res.sendStatus(HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('sensors')
	async getSensors(
		@Response() res: express.Response
	) {
		const server = await this.entityManager.findOne(Server, {
			serverId: config.serverId
		});

		if (!server) {
			res.sendStatus(HttpStatus.BAD_REQUEST);
			return;
		}

		const url = `${config.smartthings.tokenHost}${server.token.accessUrl}/sensors`;
		const options: request.CoreOptions = {
			headers: {
				'Authorization': `Bearer ${server.token.authToken}`,
				'Content-Type': 'application/json'
			}
		};

		request.get(url, options).pipe(res);
	}

	@UseGuards(AuthGuard('jwt'))
	@Put('sensors/bypass')
	async bypassSensors(
		@Response() res: express.Response
	) {
		const server = await this.entityManager.findOne(Server, {
			serverId: config.serverId
		});

		if (!server) {
			res.sendStatus(HttpStatus.BAD_REQUEST);
			return;
		}

		const url = `${config.smartthings.tokenHost}${server.token.accessUrl}/sensors/bypass`;
		const options: request.CoreOptions = {
			headers: {
				'Authorization': `Bearer ${server.token.authToken}`,
				'Content-Type': 'application/json'
			}
		};

		request.put(url, options).pipe(res);
	}

	@Post('refresh')
	async refreshSensorStates(
		@Response() res: express.Response
	) {
		const message = {
			action: 'refresh'
		};

		try {
			await this.gateway.send(message);

			res.sendStatus(HttpStatus.OK);
		} catch (e) {
			res.sendStatus(HttpStatus.BAD_REQUEST);
		}
	}

	@Post('/startCountdown')
	async intrusion(
		@Request() req: express.Request,
		@Response() res: express.Response,
		@Body() body: any
	) {
		const message = {
			action: 'startCountdown',
			data: body
		};

		try {
			await this.gateway.send(message);

			res.sendStatus(HttpStatus.OK);
		} catch (e) {
			res.sendStatus(HttpStatus.BAD_REQUEST);
		}
	}

	@Post('/relay/:action')
	async relay(
		@Request() req: express.Request,
		@Response() res: express.Response,
		@Param('action') action,
		@Body() body: any
	) {
		const message = {
			action,
			data: body || {}
		};

		try {
			await this.gateway.send(message);

			res.sendStatus(HttpStatus.OK);
		} catch (e) {
			res.sendStatus(HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(AuthGuard('jwt'))
	@Put('/arm')
	async arm(
		@Request() req: express.Request,
		@Response() res: express.Response,
		@Body() body: any
	) {
		const server = await this.entityManager.findOne(Server, {
			serverId: config.serverId
		});

		if (!server) {
			res.sendStatus(HttpStatus.BAD_REQUEST);
			return;
		}

		const url = `${config.smartthings.tokenHost}${server.token.accessUrl}/arm`;
		const options: request.CoreOptions = {
			headers: {
				'Authorization': `Bearer ${server.token.authToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body || {})
		};

		request.put(url, options).pipe(res);
	}

	@UseGuards(AuthGuard('jwt'))
	@Put('/disarm')
	async disarm(
		@Request() req: express.Request,
		@Response() res: express.Response,
		@Body() body: { securityCode: string }
	) {
		const server = await this.entityManager.findOne(Server, {
			serverId: config.serverId
		});

		if (!server) {
			res.sendStatus(HttpStatus.BAD_REQUEST);
			return;
		}

		const url = `${config.smartthings.tokenHost}${server.token.accessUrl}/disarm`;
		const payload = {
			securityCode: body.securityCode
		};

		const options: request.CoreOptions = {
			headers: {
				'Authorization': `Bearer ${server.token.authToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		};

		request.put(url, options).pipe(res);
	}

	@UseGuards(AuthGuard('jwt'))
	@Put('/try-disarm')
	async tryDisarm(
		@Request() req: express.Request,
		@Response() res: express.Response,
		@Body() body: any
	) {
		const server = await this.entityManager.findOne(Server, {
			serverId: config.serverId
		});

		if (!server) {
			res.sendStatus(HttpStatus.BAD_REQUEST);
			return;
		}

		const url = `${config.smartthings.tokenHost}${server.token.accessUrl}/try-disarm`;
		const payload = {
			securityCode: body.securityCode
		};

		const options: request.CoreOptions = {
			headers: {
				'Authorization': `Bearer ${server.token.authToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		};

		request.put(url, options).pipe(res);
	}
}
