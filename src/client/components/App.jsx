import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Register } from './Register';
import { Lot } from './Lot';

export const App = () => {
	return (
		<main>
			<Switch>
				<Route path="/register" component={ Register } />
				<Route path="/lot" component={ Lot } />
				<Redirect to="/register" />
			</Switch>
		</main>
	);
};
