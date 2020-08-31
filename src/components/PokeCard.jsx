import React, { Component } from 'react';
import '../css/PokeCard.css';

export default class PokeCard extends Component {
	render() {
		const { id, type, name, exp } = this.props;
		// console.log(props);

		return (
			<div className="PokeCard" key={id}>
				<h2 className="PokeCard-title">{name}</h2>{' '}
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
				/>
				<p>Type: {type}</p>
				<p className="PokeCard-p">EXP: {exp}</p>{' '}
			</div>
		);
	}
}
