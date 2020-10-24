import React, { Component } from "react";
import Pokedex from "./Pokedex";
import Axios from "axios";

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2/";

export default class PokeGame extends Component {
  static defaultProps = {
    pokemon: [
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
    ],
  };
  constructor(props) {
    super(props);

    this.state = {
      hand1: [],
      hand2: [],
    };
  }

  async componentDidMount() {
    const totalPokemon = await this.getTotalPokemon();
    const totalData1 = await this.init(totalPokemon);
    const totalData2 = await this.init(totalPokemon);
    this.setState({
      hand1: totalData1,
      hand2: totalData2,
    });
  }

  getTotalPokemon = async () => {
    const res = await Axios.get(
      `${POKE_API_BASE_URL}pokemon-species/?limit=1`
    );
    return res.data.count;
  };

  init = totalPokemon => {
    try {
      return this.getRandomPoke(totalPokemon);
    } catch (e) {
      console.log("failure");
    }
  };

  getRandomPoke = async totalPokemon => {
    const hand = [];
    const data = [];

    for (let i = 0; i < 4; i++) {
      const rand = Math.floor(Math.random() * totalPokemon);
      let res = await Axios.get(`${POKE_API_BASE_URL}pokemon/${rand + 1}`);
      hand.push(res.data);
      res = await Axios.get(
        `${POKE_API_BASE_URL}pokemon-species/${rand + 1}`
      );
      data.push(res.data);
    }
    const totalData = [hand, data];
    return totalData;
  };

  render() {
    function calcExp(pokedex) {
      let totalExp = 0;
      if (pokedex) {
        pokedex.forEach(pokemon => {
          totalExp += pokemon.base_experience;
        });
        return totalExp;
      }
    }

    const p1 = this.state.hand1;
    const p2 = this.state.hand2;
    const p1Exp = calcExp(p1[0]);
    const p2Exp = calcExp(p2[0]);

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
