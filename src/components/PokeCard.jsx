import React, { Component } from "react";
import ReactCardFlipper from "react-card-flipper";
import "../css/PokeCard.css";

export default class PokeCard extends Component {
  render() {
    const { id, types, name, exp, otherInfo, abilities } = this.props;
    const paddingID = oldID =>
      oldID <= 999 ? `00${oldID}`.slice(-3) : oldID;

    const getAbilities = () => {
      let typeRow = "";
      abilities.length
        ? abilities.map((a, idx) => {
            if (idx === 0) {
              return (typeRow = a.ability.name);
            }
            typeRow = typeRow.concat(", ").concat(a.ability.name);
          })
        : (typeRow = " N/A");
      return typeRow;
    };

    const getTypes = () => {
      let typeRow = "";
      types.length
        ? types.map((t, idx) => {
            if (idx === 0) {
              return (typeRow = t.type.name);
            }
            typeRow = typeRow.concat(", ").concat(t.type.name);
          })
        : (typeRow = "");

      return typeRow;
    };

    return (
      <ReactCardFlipper
        width="225px"
        height="370px"
        behavior="click"
        levitate={true}
        className="PokeCard-flipper"
      >
        <div
          className="PokeCard"
          style={{ backgroundColor: otherInfo.color.name }}
        >
          <h2 className="PokeCard-title">{name}</h2>{" "}
          <div className="PokeCard-image">
            <img
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddingID(
                id
              )}.png`}
              alt={`${name}`}
            />
          </div>
          <p>Types: {getTypes()}</p>
          <p className="PokeCard-p">EXP: {exp}</p>{" "}
        </div>

        <div
          className="PokeCard"
          style={{ backgroundColor: otherInfo.color.name }}
        >
          <h2 className="PokeCard-title">{name}</h2>{" "}
          <p>Types: {getTypes()}</p>
          <p>
            Habitat: {otherInfo.habitat ? otherInfo.habitat.name : "N/A"}
          </p>
          <ul>Abilities: {getAbilities()}</ul>
          <p>
            {otherInfo.is_legendary ? <span>Legendary</span> : ""}{" "}
            {otherInfo.is_mythical ? <span>Mythical</span> : ""}{" "}
          </p>
          <p>Fun Fact:</p>
        </div>
      </ReactCardFlipper>
    );
  }
}
