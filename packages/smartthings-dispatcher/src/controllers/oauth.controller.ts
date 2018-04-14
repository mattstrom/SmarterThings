import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { controller, cookies, httpGet, httpPost, queryParam, request, response, requestBody } from 'inversify-express-utils';
import { MongoClient, Db } from 'mongodb';
import fetch from 'node-fetch';
import * as Oauth2 from 'simple-oauth2';
import * as passport from 'passport';
import * as util from 'util';

import TYPES from '../di/types';
import { authenticator } from '../middleware';
import { ServerModel, SmartThingsToken } from '../models';
import { AuthService } from '../services/auth';


@controller('/oauth')
@injectable()
export class OAuthController {
	@inject(TYPES.ServerId) serverId: string;

	private oauth: Oauth2.OAuthClient;

	private endpointsUri: string = 'https://graph.api.smartthings.com/api/smartapps/endpoints';
	private redirectUri: string = 'http://home.mattstrom.com:4567/oauth/callback';

	private entryUrls = new Map<string, string>();

	constructor(
		@inject(TYPES.AuthService) private authService: AuthService,
		@inject(TYPES.MongoDB) private db: Promise<Db>,
		@inject(TYPES.OAuthModuleOptions) private options: Oauth2.ModuleOptions
	) {
		this.oauth = Oauth2.create(options);
	}

	@httpGet('/')
	private async index(
		@queryParam('deviceId') deviceId,
		@queryParam('entry') entryUrl,
		@request() req: express.Request,
		@response() res: express.Response
	) {
		const clientId = req.cookies['clientId'];
		const authorizationUri = this.oauth.authorizationCode.authorizeURL({
			redirect_uri: this.redirectUri,
			scope: 'app',
			state: clientId
		});

		this.entryUrls.set(clientId, entryUrl);

		let server = await ServerModel.findOne({
			serverId: this.serverId
		});

		if (!server) {
			server = new ServerModel({
				serverId: this.serverId,
				connected: false
			});
		}

		if (!server.clients.includes(clientId)) {
			server.clients.push(clientId);
		}

		await server.save();

		res.redirect(authorizationUri);
	}

	@httpGet('/disconnect')
	private async disconnect(
		@cookies('clientId') clientId,
		@request() req: express.Request,
		@response() res: express.Response
	) {
		const server = await ServerModel.findOne({
			serverId: this.serverId
		});

		if (server) {
			try {
				await server.remove();

				res.status(HttpStatus.OK)
					.send();
			} catch (e) {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.send();
			}
		}
	}

	@httpGet('/callback')
	private async callback(@request() req: express.Request, @response() res: express.Response) {
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
				redirect_uri: this.redirectUri
			});

			// result.access_token is the token, get the endpoint
			const bearer = result.access_token;
			const url = `${this.endpointsUri}?access_token=${result.access_token}`;

			const endpoints = await fetch(url, { method: 'GET' })
				.then((res) => res.json());

			const accessUrl = endpoints[0].url;

			const server = await ServerModel.findOne({
				serverId: this.serverId
			});

			const token = new SmartThingsToken();
			token.accessUrl = accessUrl;
			token.authToken = bearer;

			await server.update({
				connected: true,
				token: [token]
			});

			//this.authService.set(bearer);

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

	@httpGet('/login')
	login(@request() req: express.Request, @response() res: express.Response) {
		res.render('login');
	}

	@httpPost('/login')
	async loginPost(@requestBody() body, @request() req: express.Request, @response() res: express.Response) {
		const { username, password } = body

		const db = await this.db;
		const user = await db.collection('users')
			.findOne({ username: username, password: password });

		if (!user) {
			res.sendStatus(HttpStatus.UNAUTHORIZED);
		} else {
			res.sendStatus(HttpStatus.OK)
		}
	}

	/**
	 * Reports whether server has been connected to a SmartThings hub.
	 *
	 * @param res
	 */
	@httpGet('/connected')
	private async connected(@response() res: express.Response) {
		const servers = await ServerModel.count({
			serverId: this.serverId,
			connected: true
		});
		const connected = (servers !== 0);

		res.send(connected);
	}
}
