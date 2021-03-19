import http from 'http';
import express from 'express';
import compression from 'compression';
import clientCompiler from './client-compiler';
import render from './render';
import { App } from '../client/components/App';

const port = process.env.PORT || 3300;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const view = (req, res) => {
	render(App, req.url, './public/index.html')
		.then(content => res.send(content));
}

clientCompiler(app);

app.use(compression());
app.get('/', view);
app.use(express.static('./public'));
app.get('*', view);

const numbers = [];

io.on('connection', socket => {
	console.log('a user connected');
	io.emit('count numbers', numbers);
	
	socket.on('add number', number => {
		const i = numbers.indexOf(number);
		if (i < 0) {
			numbers.push(number);
			io.emit('count numbers', numbers);
		}
	});
	
	socket.on('remove number', number => {
		const i = numbers.indexOf(number);
		if (i > -1) {
			numbers.splice(i, 1);
			io.emit('count numbers', numbers);
		}
	});
});

server.listen(port, () => console.info(`Running on ${port}`));