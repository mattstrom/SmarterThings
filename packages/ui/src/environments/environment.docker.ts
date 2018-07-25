// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: EnvironmentContext = {
	production: false,
	apiUrl: 'http://home.mattstrom.com/api',
	wsUrl: 'ws://home.mattstrom.com/api',
	smartthings: {
		apiToken: '34af7807-231d-4c28-8619-833784f1c3ff',
		endpoint: 'https://graph-na04-useast2.api.smartthings.com/api/smartapps/installations/5fb97cd9-f69e-4d0c-a705-fa5729921ee0'
	}
};
