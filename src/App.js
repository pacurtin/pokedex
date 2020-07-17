import React, {useEffect, useState} from 'react';
import Pokedex from "./Pokedex";
import {getPokemon, getPokemonList} from "./apiCalls";

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
  const [pokemonMap, setPokemonMap] = useState({}); // stores each pokemons data pokemons id number will be its map key
  const [displayIndex, setDisplayIndex] = useState(0);    // keeps track of current pokemon being displayed
  const [pokemonLookupTable, setPokemonList] = useState([]);     // a list of names and id's.

  const debug = () => {
    debugger;
  };

  function takeIdFromUrl(url){
    const urlAry = url.split("/");
    return urlAry[urlAry.length - 2];
  }

  // runs once to create a searchable lookup table
  useEffect(() => {

    if(pokemonLookupTable.length<1){
      getPokemonList()
        .then(res=>{
          setPokemonList(
            res.data.results.map( result => {
              return {
                name:result.name,
                id:takeIdFromUrl(result.url),
              }
            }))
        })
        .finally(()=>       // get 1st pokemon Bulbasaurs info
          getPokemon(1)
            .then(res=>{
              addNewPokemon(res.data);
            })
        )
    }

    // whenever a pokemon we havn't downloaded yet is requested this will be called
    if(pokemonLookupTable[displayIndex]){
      const id= pokemonLookupTable[displayIndex].id;
      if(!pokemonMap.hasOwnProperty(id)){
        getPokemon(id)
          .then(res=>{
            addNewPokemon(res.data);
          })
      }
    }

  },[displayIndex, pokemonLookupTable, pokemonMap]);


  function addNewPokemon(newPokemon){
    setPokemonMap((prevMap)=>{
      return {...prevMap, [newPokemon.id]:newPokemon};
    })
  }

  function changePokemon(instruction) {
    if (instruction===changeEnum.INCREMENT){
      setDisplayIndex((prevNum)=>{
        if(prevNum<pokemonLookupTable.length-1) return prevNum+1;
        else return 0;
      })
    } else if (instruction===changeEnum.DECREMENT) {
      setDisplayIndex((prevNum)=>{
        if(prevNum===1) return pokemonLookupTable.length-1;
        else return prevNum-1;
      })
    }
  }

  return (
    <div className="App">
      <div id="heading">
        Code Challenge - Blue Squad
      </div>
      <button onClick={debug}>Debug</button>
      {
        pokemonLookupTable[displayIndex] &&
        pokemonLookupTable[displayIndex].id &&
        pokemonMap[pokemonLookupTable[displayIndex].id] &&
        <Pokedex
          pokemon={pokemonMap[pokemonLookupTable[displayIndex].id]}
          changePokemon={changePokemon}
        />
      }

    </div>
  );
}

export default App;
