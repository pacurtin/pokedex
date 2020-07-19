import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./Pokedex.css";
import {changeEnum} from "./App";
import TextField from "@material-ui/core/TextField";

/*
* Receives a pokemon's info and displays it
* Has buttons to cycle through sequential
* Search function included
* */

function Pokedex(props) {
  const {pokemon, changePokemon, pokemonLookupTable} = props;

  return (
    <div id="device">
      <div id="screen">
        {
          pokemon &&
          pokemon.sprites &&
          pokemon.sprites.front_default &&
          <img alt="pokemon portrait" src={pokemon.sprites.front_default}/>
        }
        {
          pokemon &&
          pokemon.sprites &&
          pokemon.sprites.front_default===null &&
          <div className="no-image">No Image</div>
        }
      </div>

      <div id="search-row">
        <Autocomplete
          id="combo-box-demo"
          options={pokemonLookupTable}
          getOptionLabel={(option) => option.name}
          style={{ width: "14em", margin: "0.5em auto 0.5em auto" }}
          renderInput={(params) =>
            <TextField {...params} label="Pokésearch" variant="outlined" color="secondary"/>
          }
          onChange={(event, newValue) => {
            if(newValue && newValue.displayIndex)changePokemon(changeEnum.LOOKUPINDEX, newValue.displayIndex);
          }}
        />
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
          pokemon.id &&
          <h3>#{pokemon.id}</h3>
        }
        {
          pokemon &&
          pokemon.name &&
          <p style={{textTransform: "capitalize"}}>Name: {pokemon.name}</p>
        }
        {
          !pokemon &&
          <h2>Loading</h2>
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
