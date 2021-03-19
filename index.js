const compiler = require('./src/compiler.js');
const serverCompiler = compiler({
	target: 'node',
	entry: './src/server/index.js', 
	output: {
		path: __dirname + '/dist',
		filename: 'server.js',
	}
});

serverCompiler.run((err, stats) => {
	if (err || stats.hasErrors()) console.error(stats.toJson().errors);
	else require('./dist/server.js');
});