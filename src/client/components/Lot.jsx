import React, { useState } from 'react';
import _ from 'lodash';
import io from'socket.io-client';
import { Wrapper } from './common/Wrapper';
import { LotNumber } from './LotNumber';

const socket = io();
const countNumbers = (() => {
	let callback = null;
	socket.on('count numbers', currentNumbers => {
		callback && callback(currentNumbers);
	});
	return fun => { callback = fun };
})();

export const Lot = () => {
	const [ numbers, setNumbers ] = useState(getNumbers());
	countNumbers(currentNumbers => {
		console.log('socket count numbers ->', currentNumbers);
		numbers.map(number => {
			number.active = currentNumbers.indexOf(number.value) > -1;
		})
		setNumbers([ ...numbers ]);
	});
	
	return (
		<section id="lot">
			<div className="container-md">
				<h2>Bingo</h2>
				<div className="numbers-grid">
					{ numbers.map(number => (
						<LotNumber key={number.value} number={number} />
					)) }
				</div>
			</div>
		</section>
	);
}

const getNumbers = () => {
	const arr = [
		[1,2,3,4,5],
		[16,17,18,19,20],
		[31,32,33,34,35],
		[46,47,48,49,40],
		[61,62,63,64,65]
	];
	return _.flattenDeep(_.zip.apply(null, arr)).map(n => ({ value: n, active: false }));
};