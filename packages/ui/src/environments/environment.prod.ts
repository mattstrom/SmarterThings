export const environment: EnvironmentContext = {
	production: true,
	apiUrl: 'https://keypad.mattstrom.com/api',
	wsUrl: 'wss://keypad.mattstrom.com',
	whitelistedDomains: [
		`http://${location.host}`
	]
};
