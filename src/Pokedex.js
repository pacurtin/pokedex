import React from 'react';
import "./Pokedex.css";

/*
* Takes an map of pokemon and a pokemon number
* Displays that pokemons info
* Has buttons to cycle through sequential
* TODO Search function
* */
function Pokedex(props) {
  const {pokemonMap, displayNum} = props;
  const displayMon = displayPokemon()

  function displayPokemon() {
    debugger;
    return pokemonMap.hasOwnProperty(displayNum) ? pokemonMap[displayNum] : {};
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
        <button>
          <i className="arrow left"/>
        </button>
        <button>
          <i className="arrow right"/>
        </button>
      </div>
      <div id="info">
        <h3>#{displayMon.id}</h3>
        <p style={{textTransform: 'capitalize'}}>Name: {displayMon.name}</p>
        <p>Weight: {displayMon.weight/10}kg</p>
        <p>Height: {displayMon.height/10}m</p>
      </div>
    </div>
  );
}

export default Pokedex;
