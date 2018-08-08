import { BadRequestException, Body, Controller, Inject, Post, Put, Request, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as request from 'request';
import { EntityManager } from 'typeorm';

import { Server } from '../entities';
import { EventsGateway } from '../services/events.gateway';
import { ServerId, SmartThingsAppUrl } from '../types';


@Controller('security')
export class SecuritySystemController {

	constructor(
		private gateway: EventsGateway,
		private entityManager: EntityManager,
		@Inject(ServerId) private serverId: string,
		@Inject(SmartThingsAppUrl) private smartThingsUri: string
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
		const clientId = body.clientId;
		const server = await this.entityManager.findOne(Server, {});

		if (!server) {
			throw new BadRequestException();
		}

		const url = `${this.smartThingsUri}${server.token.accessUrl}/status`;
		const options: request.CoreOptions = {
			headers: {
				Authorization: `Bearer ${server.token.authToken}`,
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

	@UseGuards(AuthGuard('jwt'))
	@Put('/arm')
	async arm(
		@Request() req: express.Request,
		@Response() res: express.Response,
		@Body() body: any
	) {
		const clientId = body['clientId'];
		const server = await this.entityManager.findOne(Server, {
			serverId: this.serverId
		});

		if (!server) {
			res.sendStatus(HttpStatus.BAD_REQUEST);
			return;
		}

		const url = `${this.smartThingsUri}${server.token.accessUrl}/arm`;
		const options: request.CoreOptions = {
			headers: {
				Authorization: `Bearer ${server.token.authToken}`,
				'Content-Type': 'application/json'
			}
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
		const clientId = body['clientId'];
		const server = await this.entityManager.findOne(Server, {
			serverId: this.serverId
		});

		if (!server) {
			res.sendStatus(HttpStatus.BAD_REQUEST);
			return;
		}

		const url = `${this.smartThingsUri}${server.token.accessUrl}/disarm`;
		const payload = {
			securityCode: body.securityCode
		};

		const options: request.CoreOptions = {
			headers: {
				Authorization: `Bearer ${server.token.authToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		};

		request.put(url, options).pipe(res);
	}
}
