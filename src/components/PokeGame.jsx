import React, { Component } from "react";
import Pokedex from "./Pokedex";
import Axios from "axios";

export default class PokeGame extends Component {
  state = {
    numberOfPokemon: 0,
    pokemon: [],
  };
  async componentWillMount() {
    try {
      const res = await Axios.get(
        "https://pokeapi.co/api/v2/pokemon-species/?limit=1"
      );
      this.setState(prevState => ({ numberOfPokemon: res.data.count }));
      this.grab4Rand();
    } catch (e) {}
  }

  grab4Rand = async () => {
    const hand = [];
    for (let i = 0; i < 8; i++) {
      const rand = Math.floor(Math.random() * this.state.numberOfPokemon);
      const res = await Axios.get(
        `https://pokeapi.co/api/v2/pokemon/${rand + 1}`
      );
      hand.push(res.data);
    }
    this.setState({ pokemon: hand });
  };

  render() {
    const pokemon = [
      { id: 4, name: "Charmander", type: "fire", base_experience: 62 },
      { id: 7, name: "Squirtle", type: "water", base_experience: 63 },
      { id: 11, name: "Metapod", type: "bug", base_experience: 72 },
      {
        id: 12,
        name: "Butterfree",
        type: "flying",
        base_experience: 178,
      },
      {
        id: 25,
        name: "Pikachu",
        type: "electric",
        base_experience: 112,
      },
      {
        id: 39,
        name: "Jigglypuff",
        type: "normal",
        base_experience: 95,
      },
      { id: 94, name: "Gengar", type: "poison", base_experience: 225 },
      { id: 133, name: "Eevee", type: "normal", base_experience: 65 },
    ];

    function rand4Poke() {
      const hand = [];
      for (let i = 0; i < 4; i++) {
        const rand = Math.floor(Math.random() * pokemon.length);
        hand.push(pokemon[rand]);
      }
      return hand;
    }

    function calcExp(pokedex) {
      let totalExp = 0;
      pokedex.forEach(pokemon => {
        totalExp += pokemon.base_experience;
      });
      return totalExp;
    }

    const p1 = this.state.pokemon.slice(0, 4);
    const p2 = this.state.pokemon.slice(4);
    const p1Exp = calcExp(p1);
    const p2Exp = calcExp(p2);

    return (
      <div>
        <Pokedex
          pokemon={p1}
          name="Player 1"
          isWinner={p1Exp > p2Exp ? true : false}
          totalExp={p1Exp}
        />
        <Pokedex
          pokemon={p2}
          name="Player 2"
          isWinner={p1Exp < p2Exp ? true : false}
          totalExp={p2Exp}
        />
      </div>
    );
  }
}
