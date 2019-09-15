declare namespace NodeJS {
	export interface ProcessEnv {
		API_URL: string;
		ENDPOINT_URL: string;
		JWT_SECRET: string;
		PORT: number;
		REDIRECT_URL: string;
		SERVER_ID: string;

		SMARTTHINGS_CLIENT_ID: string;
		SMARTTHINGS_CLIENT_SECRET: string;
		SMARTTHINGS_TOKEN_HOST: string;
	}
}
