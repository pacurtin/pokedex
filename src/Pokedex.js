import React from 'react';
import "./Pokedex.css";

function Pokedex(props) {

  return (
    <div id="device">
      <div id="screen">
        <img alt="Pokemon portrait" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}/>
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
        <h3>#{props.pokemon.id}</h3>
        <p style={{textTransform: 'capitalize'}}>Name: {props.pokemon.name}</p>
        <p>Weight: {props.pokemon.weight/10}kg</p>
        <p>Height: {props.pokemon.height/10}m</p>
      </div>
    </div>
  );
}

export default Pokedex;
