import React, { Component } from "react";
import Pokecard from "./PokeCard";
import "../css/Pokedex.css";

export default class Pokedex extends Component {
  static defaultProps = {
    pokemon: [
      { id: 4, name: "Charmander", type: "fire", base_experience: 62 },
      { id: 7, name: "Squirtle", type: "water", base_experience: 63 },
      { id: 11, name: "Metapod", type: "bug", base_experience: 72 },
      { id: 12, name: "Butterfree", type: "flying", base_experience: 178 },
      { id: 25, name: "Pikachu", type: "electric", base_experience: 112 },
      { id: 39, name: "Jigglypuff", type: "normal", base_experience: 95 },
      { id: 94, name: "Gengar", type: "poison", base_experience: 225 },
      { id: 133, name: "Eevee", type: "normal", base_experience: 65 },
    ],
  };
  render() {
    const props = this.props;
    console.log(props);
    return (
      <div className="Pokedex">
        <h2 className={"Pokedex-header"}>{props.name}</h2>
        <h3 className={`Pokedex-${props.isWinner ? "winner" : "loser"}`}>
          {props.isWinner ? "Winner" : "Loser"}
        </h3>
        <h4>Total Exp: {props.totalExp}</h4>
        <div className="Pokedex-cards">
          {props.pokemon.length
            ? props.pokemon[0].map((poke, idx) => (
                <Pokecard
                  id={poke.id}
                  name={poke.name}
                  types={poke.types}
                  exp={poke.base_experience}
                  key={idx}
                  otherInfo={props.pokemon[1][idx]}
                  abilities={poke.abilities}
                />
              ))
            : ""}
        </div>
      </div>
    );
  }
}
