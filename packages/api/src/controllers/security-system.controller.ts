import { BadRequestException, Body, Controller, Inject, Post, Put, Request, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';
import * as request from 'request';
import { EntityManager } from 'typeorm';

import { Server } from '../entities';
import { EventsGateway } from '../services/events.gateway';
import { ServerId, SmartThingsAppUrl } from '../types';


@Controller('security')
@UseGuards(AuthGuard('jwt'))
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

	@Post('/status')
	async getStatus(@Body() body: any, @Response() res: express.Response) {
		const clientId = body.clientId;
		const server = this.entityManager.findOne(Server, {
			serverId: this.serverId
		});

		if (!server) {
			throw new BadRequestException();
		}
	}

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
}
