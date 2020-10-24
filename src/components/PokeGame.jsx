import React, { Component } from "react";
import Pokedex from "./Pokedex";
import Axios from "axios";
import "../css/PokeGame.css";

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

  state = {
    hand1: [],
    hand2: [],
    isLoading: true,
    totalPokemon: 0,
  };

  async componentDidMount() {
    const totalPokemon = await this.getTotalPokemon();
    this.setState({ totalPokemon });
    this.init();
  }

  init = async () => {
    const totalData1 = await this.initializeHand();
    const totalData2 = await this.initializeHand();
    this.setState({
      hand1: totalData1,
      hand2: totalData2,
      isLoading: false,
    });
    document.querySelector("body").classList.remove("fullScreenHeight");
    document.querySelector("#root").classList.remove("fullScreenHeight");
    document.querySelector(".App").classList.remove("fullScreenHeight");
  };

  getTotalPokemon = async () => {
    const res = await Axios.get(
      `${POKE_API_BASE_URL}pokemon-species/?limit=1`
    );
    return res.data.count;
  };

  initializeHand = () => {
    try {
      return this.getRandomPoke(this.state.totalPokemon);
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

  handleClick = async () => {
    this.setState({ hand1: [], hand2: [], isLoading: true });
    document.querySelector("body").classList.add("fullScreenHeight");
    document.querySelector("#root").classList.add("fullScreenHeight");
    document.querySelector(".App").classList.add("fullScreenHeight");
    this.init();
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
      <div
        className={`PokeGame ${
          this.state.isLoading ? "fullScreenHeight" : ""
        }`}
      >
        {this.state.isLoading ? (
          <i className="fas fa-spinner fa-spin fa-8x PokeGame-loading-icon"></i>
        ) : (
          <>
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
            {!this.state.isLoading && (
              <button
                className="PokeGame-restart"
                onClick={this.handleClick}
              >
                Get More Pokemon?
              </button>
            )}
          </>
        )}
      </div>
    );
  }
}
