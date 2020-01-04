const tsConfig = require('../tsconfig.json');
import tsConfigPaths = require('tsconfig-paths');

tsConfigPaths.register({
	baseUrl: './dist',
	paths: tsConfig.compilerOptions.paths
});
