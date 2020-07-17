import React from 'react';
import "./Pokedex.css";

function Pokedex(props) {
  const {pokemon} = props;

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
        <button>
          <i className="arrow left"/>
        </button>
        <button>
          <i className="arrow right"/>
        </button>
      </div>
      <div id="info">
        <h3>#{pokemon.id}</h3>
        <p style={{textTransform: 'capitalize'}}>Name: {pokemon.name}</p>
        <p>Weight: {pokemon.weight/10}kg</p>
        <p>Height: {pokemon.height/10}m</p>
      </div>
    </div>
  );
}

export default Pokedex;
