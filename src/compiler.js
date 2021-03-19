const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';
const presets = {
	mode: isDev ? 'development' : 'production',
	devtool: isDev ? 'source-map' : false,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						minified: true,
						presets: [
							"@babel/preset-env",
							'@babel/preset-react'
						]
					},
				},
				exclude: [/node_modules/, /public/],
			},
		],
	},
	optimization: {
    minimize: !isDev,
    minimizer: [new TerserPlugin()],
  },
	resolve: {
		extensions: ['.js', '.jsx', '.json', '*'],
	},
	externals: {
		webpack: "require('webpack')",
		"socket.io": "require('socket.io')"
  },
	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
	],
};

module.exports = sets => {
	sets = sets || {};
	sets.plugins = sets.plugins || [];
	const plugins = [ ...presets.plugins, ...sets.plugins ];
	return webpack({ ...presets, ...sets, plugins });
}