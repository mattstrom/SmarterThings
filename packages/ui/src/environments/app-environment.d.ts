declare interface EnvironmentContext {
	production: boolean;
	apiUrl: string;
	wsUrl: string;
	whitelistedDomains: string[];
	openWeatherMapApiKey: string;
	zipCode: string;
}
