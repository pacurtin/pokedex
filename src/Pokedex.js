import React from 'react';
import "./Pokedex.css";
import {changeEnum} from "./App";

/*
* Receives a pokemon's info and displays it
* Has buttons to cycle through sequential
* TODO Search function
* */
function Pokedex(props) {
  const {pokemon, changePokemon} = props;

  return (
    <div id="device">
      <div id="screen">
        {
          pokemon &&
          pokemon.sprites &&
          <img alt="pokemon portrait" src={pokemon.sprites.front_default}/>
        }
      </div>
      <div id="selection-buttons">
        <button onClick={ () => changePokemon(changeEnum.DECREMENT)}>
          <i className="arrow left"/>
        </button>
        <button onClick={ () => changePokemon(changeEnum.INCREMENT)}>
          <i className="arrow right"/>
        </button>
      </div>
      <div id="info">
        {
          pokemon &&
          !pokemon.id &&
          <h2>Loading</h2>
        }
        {
          pokemon &&
          pokemon.id &&
          <h3>#{pokemon.id}</h3>
        }
        {
          pokemon &&
          pokemon.name &&
          <p>Name: {pokemon.name}</p>
        }
        {
          pokemon &&
          pokemon.weight &&
          <p>Weight: {pokemon.weight/10}kg</p>
        }

        {
          pokemon &&
          pokemon.height &&
          <p>Height: {pokemon.height/10}m</p>
        }
      </div>
    </div>
  );
}

export default Pokedex;
