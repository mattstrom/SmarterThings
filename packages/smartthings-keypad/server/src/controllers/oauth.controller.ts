import * as express from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpGet, request, response } from 'inversify-express-utils';
import fetch from 'node-fetch';
import * as Oauth2 from 'simple-oauth2';

import TYPES from '../di/types';
import { AuthService } from '../services';


@controller('/oauth')
@injectable()
export class OAuthController {
	private oauth: Oauth2.OAuthClient;
	private endpointsUri: string = 'https://graph.api.smartthings.com/api/smartapps/endpoints';
	private redirectUri: string = 'http://localhost:4567/oauth/callback';

	constructor(
		@inject(TYPES.AuthService) private authService: AuthService,
		@inject(TYPES.OAuthModuleOptions) private options: Oauth2.ModuleOptions
	) {
		this.oauth = Oauth2.create(options);
	}

	@httpGet('/')
	private index( @request() request: express.Request, @response() response: express.Response) {
		const authorizationUri = this.oauth.authorizationCode.authorizeURL({
			redirect_uri: this.redirectUri,
			scope: 'app',
			state: '3(#0/!~'
		});

		response.redirect(authorizationUri);
	}

	@httpGet('/callback')
	private callback(@request() request: express.Request, @response() response: express.Response) {
		const code = request.query.code;

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
					// we just show the final access URL and Bearer code
					const access_url = endpoints[0].url;

					const html = `
						<pre>https://graph.api.smartthings.com/${access_url}</pre>
						<br>
						<pre>Bearer ${bearer}</pre>
					`;

					this.authService.set(bearer);

					response.send(html);
				});
		}
	}
}
