import React, {useEffect, useState} from 'react';
import Pokedex from "./Pokedex";
import {getPokemon} from "./apiCalls";

export const changeEnum = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement'
};

function App() {
  /*
  *     To avoid hammering the API I will only request data from the API as needed.
  *     I will however save anything I get to avoid multiple requests for the same pokemon data.
  *     Since we will be filling in our data in a piecemeal fashion and potentially out of order
  *     I will use a hashmap to store the data.
  *     A JS object has a HashMap in its implementation so we just use that.
  * */
  const totalPokemon = 807;
  const [pokemonMap, setPokemonMap] = useState({}); // pokemons number will be its map key
  const [displayNum, setDisplayNum] = useState(1);  // keeps track of current pokemon being displayed

  // runs once to initialize app with our first pokemon and then again whenever displayNum changes
  useEffect(() => {
    if(!pokemonMap.hasOwnProperty(displayNum)){
      getPokemon(displayNum)
        .then(res=>{
          addNewPokemon(res.data);
        })
      }
  },[displayNum, pokemonMap]);

  function addNewPokemon(newPokemon){
    setPokemonMap((prevMap)=>{
      return {...prevMap, [newPokemon.id]:newPokemon};
    })
  }

  function changePokemon(instruction) {
    if (instruction===changeEnum.INCREMENT){
      setDisplayNum((prevNum)=>{
        if(prevNum<totalPokemon) return prevNum+1;
        else return 1;
      })
    } else if (instruction===changeEnum.DECREMENT) {
      setDisplayNum((prevNum)=>{
        if(prevNum===1) return totalPokemon;
        else return prevNum-1;
      })
    }
  }

  return (
    <div className="App">
      <div id="heading">
        Code Challenge - Blue Squad
      </div>
      {
        pokemonMap && displayNum &&
        <Pokedex
          pokemonMap={pokemonMap}
          displayNum={displayNum}
          changePokemon={changePokemon}
        />
      }

    </div>
  );
}

export default App;
