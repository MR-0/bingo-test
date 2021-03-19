import React, { useState } from 'react';

export const Form = () => {
	const [data, setData] = useState({ name: '', email: '' });
	const onFormSubmit = event => {
		event.preventDefault();
	};
	const onNameChangeHandler = event => {
		setData({ ...data, name: event.target.value });
	};
	const onEmailChangeHandler = event => {
		setData({ ...data, email: event.target.value });
	};
	return (
		<React.Fragment>
			<h1>Smoke 57</h1>
			<form onSubmit={onFormSubmit}>
				<div>
					<label htmlFor={'name-input'} defaultValue={'Name'}>
						Name:{' '}
					</label>
					<input
						name={'name-input'}
						onChange={onNameChangeHandler}
						type={'text'}
						value={data.name}
					/>
				</div>
				<br />
				<div>
					<label htmlFor={'email-input'} defaultValue={'Email'}>
						Email:{' '}
					</label>
					<input
						name={'email-input'}
						onChange={onEmailChangeHandler}
						type={'email'}
						placeholder={'email'}
						value={data.email}
					/>
				</div>
				<br />
				<div>
					<button type={'submit'}>Submit</button>
				</div>
			</form>
			<span>
				<h5>Name: {data.name}</h5>
			</span>
			<span>
				<h5>Email: {data.email}</h5>
			</span>
		</React.Fragment>
	);
};
