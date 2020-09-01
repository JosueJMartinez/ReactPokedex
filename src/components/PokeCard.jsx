import React, { Component } from 'react';
import '../css/PokeCard.css';

export default class PokeCard extends Component {
	render() {
		const { id, type, name, exp } = this.props;
		// console.log(props);
		const paddingID = oldID =>
			oldID <= 999 ? `00${oldID}`.slice(-3) : oldID;
		return (
			<div className="PokeCard">
				<h2 className="PokeCard-title">{name}</h2>{' '}
				<div className="PokeCard-image">
					<img
						src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddingID(
							id
						)}.png`}
						alt={`${name}`}
					/>
				</div>
				<p>Type: {type}</p>
				<p className="PokeCard-p">EXP: {exp}</p>{' '}
			</div>
		);
	}
}
