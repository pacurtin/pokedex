import React from 'react';
import "./Pokedex.css";
import {changeEnum} from "./App";

/*
* Takes an map of pokemon and a pokemon number
* Displays that pokemons info
* Has buttons to cycle through sequential
* TODO Search function
* */
function Pokedex(props) {
  const {pokemonMap, displayNum, changePokemon} = props;
  const displayMon = displayPokemon();

  function displayPokemon() {
    return pokemonMap.hasOwnProperty(displayNum) ?
      pokemonMap[displayNum] :
      {};
  }

  return (
    <div id="device">
      <div id="screen">
        {
          displayMon &&
          displayMon.sprites &&
          <img alt="pokemon portrait" src={displayMon.sprites.front_default}/>
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
          !displayMon.id &&
          <h2>Loading</h2>
        }
        {
          displayMon.id &&
          <h3>#{displayMon.id}</h3>
        }
        {
          displayMon.name &&
          <p>Name: {displayMon.name}</p>
        }
        {
          displayMon.weight &&
          <p>Weight: {displayMon.weight/10}kg</p>
        }

        {
          displayMon.height &&
          <p>Height: {displayMon.height/10}m</p>
        }
      </div>
    </div>
  );
}

export default Pokedex;
