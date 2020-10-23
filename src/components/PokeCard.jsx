import React, { Component } from "react";
import ReactCardFlipper from "react-card-flipper";
import "../css/PokeCard.css";

export default class PokeCard extends Component {
  render() {
    const { id, type, name, exp } = this.props;
    const paddingID = oldID =>
      oldID <= 999 ? `00${oldID}`.slice(-3) : oldID;

    return (
      <ReactCardFlipper
        width="225px"
        height="370px"
        behavior="click"
        levitate={true}
        className="PokeCard-flipper"
      >
        <div className="PokeCard">
          <h2 className="PokeCard-title">{name}</h2>{" "}
          <div className="PokeCard-image">
            <img
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddingID(
                id
              )}.png`}
              alt={`${name}`}
            />
          </div>
          <p>Type: {type}</p>
          <p className="PokeCard-p">EXP: {exp}</p>{" "}
        </div>

        <div className="PokeCard">
          <h2 className="PokeCard-title">{name}</h2> <p>Type:</p>
          <p>Habitat:</p>
          <p>Abilities:</p>
          <p>
            <span>Legendary</span> <span>Mythical</span>
          </p>
          <p>Fun Fact:</p>
        </div>
      </ReactCardFlipper>
    );
  }
}
