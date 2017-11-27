import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost, queryParam, request, response, requestBody } from 'inversify-express-utils';
import { MongoClient, Db } from 'mongodb';
import fetch from 'node-fetch';
import * as Oauth2 from 'simple-oauth2';
import * as passport from 'passport';

import TYPES from '../di/types';
import { authenticator } from '../middleware';
import { AuthService } from '../services/auth';


@controller('/oauth')
@injectable()
export class OAuthController {
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
	private async index(@queryParam('entryUrl') entryUrl, @request() request: express.Request, @response() response: express.Response) {
		const identity = request.cookies['identity'];
		const authorizationUri = this.oauth.authorizationCode.authorizeURL({
			redirect_uri: this.redirectUri,
			scope: 'app',
			state: identity
		});

		this.entryUrls.set(identity, entryUrl);

		await this.db.then((db) =>
			db.collection('authTokens').insertOne({ identity: identity })
		);

		response.redirect(authorizationUri);
	}

	@httpGet('/callback')
	private async callback(@request() request: express.Request, @response() response: express.Response) {
		const code = request.query.code;
		const identity = request.query.state;



		this.oauth.authorizationCode.getToken({
			code: code,
			redirect_uri: this.redirectUri
		}, saveToken.bind(this));

		function saveToken(error, result) {
			if (error) { console.log('Access Token Error', error.message); }

			// result.access_token is the token, get the endpoint
			const bearer = result.access_token;
			const url = `${this.endpointsUri}?access_token=${result.access_token}`;

			fetch(url, { method: 'GET' })
				.then((res) => res.json())
				.then((body) => {
					const endpoints = body;
					const accessUrl = endpoints[0].url;

					return this.db.then(async (db: Db) => {
						const item = await db.collection('authTokens')
							.update({ identity: identity }, {
								$set: {
									accessUrl: accessUrl,
									authToken: bearer
								}
							});

						this.authService.set(bearer);
					})
					.then(() => body);
				})
				.then((body) => {
					const entryUrl = this.entryUrls.get(identity);

					if (entryUrl) {
						response.redirect(entryUrl);
					} else {
						const endpoints = body;
						// we just show the final access URL and Bearer code
						const access_url = endpoints[0].url;

						const html = `
							<pre>https://graph.api.smartthings.com/${access_url}</pre>
							<br>
							<pre>Bearer ${bearer}</pre>
						`;

						response.send(html);
					}
				});
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
}
