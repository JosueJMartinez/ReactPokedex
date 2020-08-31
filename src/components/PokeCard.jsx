import React, { Component } from 'react';
import '../css/PokeCard.css';

export default class PokeCard extends Component {
	render() {
		const { id, type, name, exp } = this.props;
		// console.log(props);
		function paddingID(oldID) {
			const stringID = oldID + '';
			if (stringID.length === 1) return '00' + stringID;
			else if (stringID.length === 2) return '0' + stringID;
			return oldID;
		}
		return (
			<div className="PokeCard">
				<h2 className="PokeCard-title">{name}</h2>{' '}
				<img
					src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddingID(
						id
					)}.png`}
					alt={`${name} picture`}
				/>
				<p>Type: {type}</p>
				<p className="PokeCard-p">EXP: {exp}</p>{' '}
			</div>
		);
	}
}
