export const environment: EnvironmentContext = {
	production: true,
	apiUrl: 'https://keypad.mattstrom.com/api',
	wsUrl: 'wss://keypad.mattstrom.com',
	whitelistedDomains: [
		`http://${location.host}`
	],
	openWeatherMapApiKey: '85d1016a800249dcff138643c256109f',
	zipCode: '94520'
};
