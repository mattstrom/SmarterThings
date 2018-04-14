import * as webpack from 'webpack';
import * as fs from 'fs';
import * as path from 'path';
import * as CircularDependencyPlugin from 'circular-dependency-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ProgressPlugin from 'webpack/lib/ProgressPlugin';

import { NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin } from '@angular/cli/plugins/webpack';
import { AngularCompilerPlugin } from '@ngtools/webpack';

import NamedModulesPlugin = webpack.NamedModulesPlugin;
import CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');

const entryPoints = [
	'inline',
	'polyfills',
	'sw-register',
	'styles',
	'vendor',
	'main'
];

export default function (context: string) {
	return {
		context: context,
		resolve: {
			extensions: [
				'.ts',
				'.js'
			],
			modules: [
				'./node_modules'
			],
			symlinks: true
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: '@ngtools/webpack'
				},
				{
					test: /\.html$/,
					loader: 'raw-loader'
				},

			]
		},
		plugins: [
			new webpack.NoEmitOnErrorsPlugin(),
			new CopyWebpackPlugin([
				{
					context: 'src',
					to: '',
					from: {
						glob: 'assets/**/*',
						dot: true
					}
				},
				{
					context: 'src',
					to: '',
					from: {
						glob: 'favicon.ico',
						dot: true
					}
				}
			], {
					ignore: [
						'.gitkeep',
						'**/.DS_Store',
						'**/Thumbs.db'
					],
					debug: 'warning'
				}),
			new ProgressPlugin(),
			new CircularDependencyPlugin({
				'exclude': /(\\|\/)node_modules(\\|\/)/,
				'failOnError': false
			}),
			new NamedLazyChunksWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: './src/index.html',
				filename: './index.html',
				hash: false,
				inject: true,
				compile: true,
				favicon: false,
				minify: false,
				cache: true,
				showErrors: true,
				chunks: 'all',
				excludeChunks: [],
				title: 'Webpack App',
				xhtml: true,
				chunksSortMode: (left, right) => {
					const leftIndex = entryPoints.indexOf(left.names[0]);
					const rightindex = entryPoints.indexOf(right.names[0]);

					if (leftIndex > rightindex) {
						return 1;
					} else if (leftIndex < rightindex) {
						return -1;
					} else {
						return 0;
					}
				}
			}),
			new BaseHrefWebpackPlugin({ baseHref: '' }),
			new CommonsChunkPlugin({
				name: 'inline',
				minChunks: null
			}),
			new CommonsChunkPlugin({
				name: 'inline',
				minChunks: (module) => {
					return module.resource
						&& (module.resource.startsWith(nodeModules)
							|| module.resource.startsWith(genDirNodeModules)
							|| module.resource.startsWith(realNodeModules));
				}
			}),
			new webpack.SourceMapDevToolPlugin({
				filename: '[file].map[query]',
				moduleFilenameTemplate: '[resource-path]',
				fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
				sourceRoot: 'webpack:///'
			}),
			new webpack.NamedModulesPlugin(),
			new AngularCompilerPlugin({
				mainPath: 'main.ts',
				platform: 0,
				hostReplacementPaths: {
					'environments/environment.ts': 'environments/environment.ts'
				},
				sourceMap: true,
				tsConfigPath: 'src/tsconfig.app.json',
				skipCodeGeneration: true,
				compilerOptions: {}
			})
		],

		node: {
			fs: 'empty',
			global: true,
			crypto: 'empty',
			tls: 'empty',
			net: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		},

		devServer: {
			historyApiFallback: true
		}
	} as webpack.Configuration;
}
