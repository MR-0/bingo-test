import path from 'path';
import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import compiler from '../compiler';

const isDev = process.env.NODE_ENV !== 'production';
const entry = ['./src/client/index.js'];

if (isDev) entry.push('webpack-hot-middleware/client?reload=true&overlay=false');

export default app => {
	const clientCompiler = compiler({
		entry,
		output: {
			path: path.resolve('./dist/client'),
			publicPath: '/assets',
			filename: 'bundle.js',
		},
		plugins: [
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin(),
		]
	});
	
	if (isDev) {
		app.use(
			webpackDevMiddleware(clientCompiler, {
				publicPath: '/assets',
				stats: { modules: false, colors: true },
			})
		);
		app.use(webpackHotMiddleware(clientCompiler));
	}
	else {
		app.use((req, res, next) => {
			clientCompiler.run((err, stats) => {
				if (err || stats.hasErrors()) console.error(stats.toJson().errors);
				else {
					app.use('/assets/bundle.js', express.static('./dist/client/bundle.js'));
					app.use('/assets/bundle.js.map', express.static('./dist/client/bundle.js.map'));
				}
				next();
			});	
		});
	}
}