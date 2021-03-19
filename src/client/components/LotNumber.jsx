import React from 'react';
import io from'socket.io-client';

const socket = io();

export const LotNumber = ({ number }) => {
	const handleClick = e => {
		e.preventDefault();
		console.log(number);
		if (number.active) socket.emit('remove number', number.value);
		else socket.emit('add number', number.value);
	};
	return (
		<div className={ 'number' + (number.active ? ' active' : '') }>
			<a onClick={ handleClick } href={ '#number-'+number.value }>
				<span className="h4">{number.value}</span>
			</a>
		</div>
	);
};