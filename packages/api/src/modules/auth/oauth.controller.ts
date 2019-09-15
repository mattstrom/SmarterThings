import { Controller, Get, Param, Query, Request, Response, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import fetch from 'node-fetch';
import * as Oauth2 from 'simple-oauth2';
import { EntityManager, MongoEntityManager } from 'typeorm';

import config from '../../configuration';
import { Cookie } from '../../decorators';
import { Server, SmartThingsToken } from '../../entities';
import { OauthModuleOptions } from '../../types';


@Controller('oauth')
export class OauthController {
	private oauth: Oauth2.OAuthClient;
	private entryUrls = new Map<string, string>();

	constructor(
		@Inject(EntityManager) private entityManager: MongoEntityManager,
		@Inject(OauthModuleOptions) private options: Oauth2.ModuleOptions
	) {
		this.oauth = Oauth2.create(options);
		const c = config;
		console.log(c);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('/')
	async index(
		@Param('entry') entryUrl,
		@Request() req: express.Request,
		@Response() res: express.Response,
		@Cookie('clientId') clientId
	) {
		const authorizationUri = this.oauth.authorizationCode.authorizeURL({
			redirect_uri: config.urls.redirect,
			scope: 'app',
			state: clientId
		});

		this.entryUrls.set(clientId, entryUrl);

		let server = await this.entityManager.findOne(Server, {
			serverId: config.serverId
		});

		if (!server) {
			server = this.entityManager.create(Server, {
				serverId: config.serverId,
				connected: false,
				clients: []
			});
		}

		if (!server.clients.includes(clientId)) {
			server.clients.push(clientId);
		}

		await this.entityManager.save(server);

		res.redirect(authorizationUri);
	}

	/**
	 * Reports whether server has been connected to a SmartThings hub.
	 */
	@UseGuards(AuthGuard('jwt'))
	@Get('/connected')
	async connected(@Response() res: express.Response) {
		const servers = await this.entityManager.count(Server, {
			serverId: config.serverId,
			connected: true
		});

		const connected = (servers !== 0);

		res.send(connected);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('/disconnect')
	async disconnect(
		@Cookie('clientId') clientId,
		@Request() req: express.Request,
		@Response() res: express.Response
	) {
		const server = await this.entityManager.findOne(Server, {
			serverId: config.serverId
		});

		if (server) {
			try {
				await this.entityManager.remove(server);

				res.status(HttpStatus.OK)
					.send();
			} catch (e) {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.send();
			}
		}
	}

	@Get('/callback')
	async callback(
		@Query('code') code: string,
		@Query('clientId') clientId: string,
		@Query() error: string,
		@Request() req: express.Request,
		@Response() res: express.Response
	) {
		if (req.query.error) {
			switch (req.query.error) {
				case 'access_denied': {
					res.send(HttpStatus.FORBIDDEN);
					return;
				}
				default:
					res.send(HttpStatus.INTERNAL_SERVER_ERROR);
					return;
			}
		}

		const tokenParams = {
			code: code,
			redirect_uri: config.urls.redirect
		};

		console.log(JSON.stringify(tokenParams));

		try {
			const result = await this.oauth.authorizationCode.getToken(tokenParams);

			console.log(JSON.stringify(result));

			const bearer = result.access_token;
			const url = `${config.urls.endpoint}?access_token=${result.access_token}`;

			const endpoints = await fetch(url, { method: 'GET' })
				.then(resp => resp.json());

			console.log(JSON.stringify(endpoints));

			const accessUrl = endpoints[0].url;
			const server = await this.entityManager.findOne(Server, {
				serverId: config.serverId
			});

			const token = new SmartThingsToken();
			token.accessUrl = accessUrl;
			token.authToken = bearer;

			server.connected = true;
			server.token = token;

			await this.entityManager.save(server);

			const entryUrl = this.entryUrls.get(clientId);

			res.redirect('/');
			return;
		} catch (e) {
			console.error('Access Token Error', tokenParams, e.message);
			throw e;
		}
	}
}
