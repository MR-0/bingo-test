import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

export default (Element, location, file) => {
	const context = {};
	return new Promise ((resolve, reject) => {
		fs.readFile(path.resolve(file), (err, content) => {
			if (err) reject(err);
			else {
				const str = content.toString();
				const appStr = renderToString(
					<StaticRouter location={location} context={context}>
						<Element />
					</StaticRouter>
				);
				const result = str.replace(/<.+id="app"[^<]*>/, tag => tag + appStr);
				resolve(result);
			}
		});
	});
};
