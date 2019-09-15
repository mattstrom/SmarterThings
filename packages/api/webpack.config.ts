import * as webpack from 'webpack';
import * as path from 'path';
import * as nodeExternals from 'webpack-node-externals';

export = {
	entry: [
		'webpack/hot/poll?100',
		'./src/main.ts'
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'server.js',
	},
	mode: 'development',
	watch: true,
	target: 'node',
	externals: [
		nodeExternals({
			whitelist: ['webpack/hot/poll?100'],
		}),
	],
	module: {
		rules: [
			{
				test: /.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};
