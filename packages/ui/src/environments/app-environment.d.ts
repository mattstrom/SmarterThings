declare interface EnvironmentContext {
	production: boolean;
	apiUrl: string;
	wsUrl: string;
	smartthings: {
		apiToken: string;
		endpoint: string;
	}
}
