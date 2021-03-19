import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Register = () => {
	const history = useHistory();
	const [formState, setFormState] = useState('');
	const handleSubmit = e => {
		e.preventDefault();
		setFormState('sending');
		console.log(e.target);
		history.push('/lot');
	};
	
	return (
		<section id="register">
			<div className="container-sm">
				<h2>Inscripción Bingo</h2>
				<form className={formState} onSubmit={ handleSubmit }>
					<p>
						<label className="box">
							<span className="label">Nombres</span>
							<input name="name" type="text"/>
						</label>
					</p>
					<p>
						<label className="box">
							<span className="label">Email</span>
							<input name="email" type="text"/>
						</label>
					</p>
					<button type="submit">Inscribirse</button>
				</form>
			</div>
		</section>
	)
}