import { Config } from '~/configuration';

export default {
	debug: true,
	urls: {
		access: '/api/smartapps/installations/<smartthings hub id>',
		api: 'https://keypad.your-domain.com/api',
		endpoint: 'https://graph.api.smartthings.com/api/smartapps/endpoints',
		inbound: 'https://keypad.your-domain.com/inbound',
		redirect: 'https://keypad.your-domain.com/inbound/oauth/callback'
	},
	jwtSecret: 'secret',
	port: 4567,
	serverId: 'https://keypad.your-domain.com/api',
	smartthings: {
		clientId: '<client id in app settings>',
		clientSecret: '<client secret in app settings>',
		tokenHost: 'https://graph-na04-useast2.api.smartthings.com'
	}
} as Config;
