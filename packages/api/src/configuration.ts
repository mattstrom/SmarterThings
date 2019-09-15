import config from 'config';
import convict from 'convict';


export interface Config {
	debug: boolean;
	urls: {
		access: string;
		api: string;
		endpoint: string;
		inbound: string;
		redirect: string;
	};
	jwtSecret: string;
	port: number;
	serverId: string;
	smartthings: {
		clientId: string;
		clientSecret: string;
		tokenHost: string;
	};
}

const schema = convict<Config>({
	debug: {
		format: Boolean,
		default: false,
		env: 'DEBUG'
	},
	urls: {
		access: {
			format: String,
			default: '/api/smartapps/installations/251a57bf-706d-4a87-a5e4-10a028f00805',
			env: 'ACCESS_URL'
		},
		api: {
			format: 'url',
			default: 'https://api.mattstrom.com',
			env: 'API_URL'
		},
		endpoint: {
			format: 'url',
			default: 'https://graph.api.smartthings.com/api/smartapps/endpoints',
			env: 'ENDPOINT_URL'
		},
		inbound: {
			format: 'url',
			default: 'https://inbound.mattstrom.com',
			env: 'INBOUND_URL'
		},
		redirect: {
			format: 'url',
			default: 'https://ui.mattstrom.com/keypad',
			env: 'REDIRECT_URL'
		}
	},
	jwtSecret: {
		format: String,
		default: 'secret',
		env: 'JWT_SECRET'
	},
	port: {
		format: 'port',
		default: 4567,
		env: 'PORT'
	},
	serverId: {
		format: 'url',
		default: 'https://api.mattstrom.com',
		env: 'SERVER_ID'
	},
	smartthings: {
		clientId: {
			format: String,
			default: 'b92dcaae-8905-4982-a40f-fc15b6bcec37',
			env: 'SMARTTHINGS_CLIENT_ID'
		},
		clientSecret: {
			format: String,
			default: 'a14c2f34-300d-4956-b8c3-331716deab6d',
			env: 'SMARTTHINGS_CLIENT_SECRET'
		},
		tokenHost: {
			format: 'url',
			default: 'https://graph-na04-useast2.api.smartthings.com',
			env: 'SMARTTHINGS_TOKEN_HOST'
		}
	}
});

export default schema
	.load(config.util.toObject())
	.validate({ allowed: 'strict' })
	.getProperties() as Config;
