module.exports = {
	apps: [{
		name: 'API',
		script: 'dist/main.js',
		source_map_support: true,
		env: {
			NODE_ENV: 'production'
		},
		env_development: {
			NODE_ENV: 'development'
		}
	}]
};
