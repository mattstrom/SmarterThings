import { Body, Controller, Get, Param, Post, Request, Response, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import fetch from 'node-fetch';
import * as Oauth2 from 'simple-oauth2';
import { EntityManager, MongoEntityManager } from 'typeorm';

import { Cookie } from '../decorators';
import { Server, SmartThingsToken, User } from '../entities';
import { EndpointUrl, OauthModuleOptions, ServerId, RedirectUrl } from '../types';


@Controller('oauth')
@UseGuards(AuthGuard('jwt'))
export class OauthController {
	private oauth: Oauth2.OAuthClient;
	private entryUrls = new Map<string, string>();

	constructor(
		@Inject(EndpointUrl) private endpointUrl: string,
		@Inject(EntityManager) private entityManager: MongoEntityManager,
		@Inject(OauthModuleOptions) private options: Oauth2.ModuleOptions,
		@Inject(RedirectUrl) private redirectUrl: string,
		@Inject(ServerId) private serverId: string
	) {
		this.oauth = Oauth2.create(options);
	}

	@Get('/')
	async index(
		@Param('deviceId') deviceId,
		@Param('entry') entryUrl,
		@Request() req: express.Request,
		@Response() res: express.Response,
		@Cookie('clientId') clientId
	) {
		const authorizationUri = this.oauth.authorizationCode.authorizeURL({
			redirect_uri: this.redirectUrl,
			scope: 'app',
			state: clientId
		});

		this.entryUrls.set(clientId, entryUrl);

		let server = await this.entityManager.findOne(Server, {
			serverId: this.serverId
		});

		if (!server) {
			server = this.entityManager.create(Server, {
				serverId: this.serverId,
				connected: false
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
	@Get('/connected')
	async connected(@Response() res: express.Response) {
		const servers = await this.entityManager.count(Server, {
			serverId: this.serverId,
			connected: true
		});

		const connected = (servers !== 0);

		res.send(connected);
	}

	@Get('/disconnect')
	async disconnect(
		@Cookie('clientId') clientId,
		@Request() req: express.Request,
		@Response() res: express.Response
	) {
		const server = await this.entityManager.findOne(Server, {
			serverId: this.serverId
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

		const code = req.query.code;
		const clientId = req.query.state;

		try {
			const result = await this.oauth.authorizationCode.getToken({
				code: code,
				redirect_uri: this.redirectUrl
			});

			const bearer = result.access_token;
			const url = `${this.endpointUrl}?access_token=${result.access_token}`;

			const endpoints = await fetch(url, { method: 'GET' })
				.then(resp => resp.json());

			const accessUrl = endpoints[0].url;
			const server = await this.entityManager.findOne(Server, {
				serverId: this.serverId
			});

			const token = new SmartThingsToken();
			token.accessUrl = accessUrl;
			token.authToken = bearer;

			await this.entityManager.updateOne(Server, server, {
				connected: true,
				token: [token]
			});

			const entryUrl = this.entryUrls.get(clientId);

			if (entryUrl) {
				res.redirect(entryUrl);
			} else {
				const html = `
					<pre>https://graph.api.smartthings.com/${accessUrl}</pre>
					<br>
					<pre>Bearer ${bearer}</pre>
				`;

				res.send(html);
			}
		} catch (e) {
			console.error('Access Token Error', e.message);
		}
	}
}
