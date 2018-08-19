declare namespace NodeJS {
	export interface ProcessEnv {
		API_URL: string;
		DOMAIN: string;
		ENDPOINT_URL: string;
		JWT_SECRET: string;
		REDIRECT_URL: string;
		SERVER_ID: string;
		TYPEORM_HOST: string;

		SMARTTHINGS_CLIENT_ID: string;
		SMARTTHINGS_CLIENT_SECRET: string;
		SMARTTHINGS_TOKEN_HOST: string;
	}
}
