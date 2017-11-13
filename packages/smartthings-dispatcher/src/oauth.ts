/*
 OAUTH Client Example
 needs 
 npm install express
 npm install request
 npm install JSON
*/

import * as request from 'request';
import * as express from 'express';
import * as Oauth2 from 'simple-oauth2';

// expected commandline node.js script CLIENT_ID CLIENT_SECRET
if (process.argv.length !== 4) {
	console.log('usage: ' + process.argv[0] + ' ' + process.argv[1] + ' CLIENT_ID CLIENT_SECRET');
	process.exit();
}

const CLIENT_ID = process.argv[2];
const CLIENT_SECRET = process.argv[3];

const app = express();

const endpoints_uri = 'https://graph.api.smartthings.com/api/smartapps/endpoints';

const credentials = {
	client: {
		id: CLIENT_ID,
		secret: CLIENT_SECRET
	},
	auth: {
		tokenHost: 'https://graph.api.smartthings.com'
	}
};

const oauth2 = Oauth2.create(credentials);

// Authorization uri definition
const authorization_uri = oauth2.authorizationCode.authorizeURL({
	redirect_uri: 'http://localhost:4567/oauth/callback',
	scope: 'app',
	state: '3(#0/!~'
});

// Initial page redirecting to Github
app.get('/auth', function (req, res) {
	res.redirect(authorization_uri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/oauth/callback', function (req, res) {
	const code = req.query.code;
	// console.log('/callback got code' + code);
	oauth2.authorizationCode.getToken({
		code: code,
		redirect_uri: 'http://localhost:4567/oauth/callback'
	}, saveToken);

	function saveToken(error, result) {
		if (error) { console.log('Access Token Error', error.message); }

		// result.access_token is the token, get the endpoint
		const bearer = result.access_token;
		const sendreq = { method: 'GET', uri: endpoints_uri + '?access_token=' + result.access_token };
		request(sendreq, function (err, res1, body) {
			const endpoints = JSON.parse(body);
			// we just show the final access URL and Bearer code
			const access_url = endpoints[0].url
			res.send('<pre>https://graph.api.smartthings.com/' + access_url + '</pre><br><pre>Bearer ' + bearer + '</pre>');
		});
	}
});

app.get('/', function (req, res) {
	res.send('<a href="/auth">Connect with SmartThings</a>');
});

app.listen(4567);

console.log('Express server started on port 4567');
