declare interface EnvironmentContext {
	production: boolean;
	apiUrl: string;
	wsUrl: string;
	whitelistedDomains: string[];
}
