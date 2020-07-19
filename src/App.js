import React, {useEffect, useState} from 'react';
import Pokedex from "./Pokedex";
import {getPokemon, getPokemonList} from "./apiCalls";

export const changeEnum = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  LOOKUPINDEX: 'lookupIndex'
};

function App() {
  /*
  *     To avoid hammering the API I will only request data from the API as needed.
  *     I will however save anything I get to avoid multiple requests for the same pokemon data.
  *     Since we will be filling in our data in a piecemeal fashion and potentially out of order
  *     I will use a hashmap to store each pokemons data.
  *     A JS object has a HashMap in its implementation so we just use that.
  * */
  const [pokemonMap, setPokemonMap] = useState({}); // stores each pokemons data. pokemons id number will be its map key
  const [lookupIndex, setLookupIndex] = useState(0);    // keeps track of current pokemon being displayed
  const [pokemonLookupTable, setPokemonLookupTable] = useState([]);     // a list of names and id's for search feature

  function takeIdFromUrl(url){
    const urlAry = url.split("/");
    return urlAry[urlAry.length - 2];
  }

  useEffect(() => {
    // runs once to create a searchable lookup table
    if(pokemonLookupTable.length<1){
      getPokemonList()
        .then(res=>{
          setPokemonLookupTable(
            res.data.results.map( (result,index) => {
              return {
                name:result.name,
                id:takeIdFromUrl(result.url),
                displayIndex:index
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

    // whenever a pokemon we have not downloaded yet is requested this will be called
    if(pokemonLookupTable[lookupIndex]){
      const id = pokemonLookupTable[lookupIndex].id;
      if(!pokemonMap.hasOwnProperty(id)){
        getPokemon(id)
          .then(res=>{
            addNewPokemon(res.data);
          })
      }
    }

  },[lookupIndex, pokemonLookupTable, pokemonMap]);


  function addNewPokemon(newPokemon){
    setPokemonMap((prevMap)=>{
      return {...prevMap, [newPokemon.id]:newPokemon};
    })
  }

  function changePokemon(instruction,lookupIndex) {
    if (instruction===changeEnum.INCREMENT){
      setLookupIndex((prevNum)=>{
        if(prevNum<pokemonLookupTable.length-1) return prevNum+1;
        else return 0;
      })
    } else if (instruction===changeEnum.DECREMENT) {
      setLookupIndex((prevNum)=>{
        if(prevNum===0) return pokemonLookupTable.length-1;
        else return prevNum-1;
      })
    } else if (instruction===changeEnum.LOOKUPINDEX) {
      setLookupIndex(lookupIndex);
    }
  }

  return (
    <div className="App">
      <div id="heading">
        Code Challenge - Blue Squad
      </div>
      {
        pokemonLookupTable[lookupIndex] &&
        pokemonLookupTable[lookupIndex].id &&
        <Pokedex
          pokemon={pokemonMap[pokemonLookupTable[lookupIndex].id]}
          changePokemon={changePokemon}
          pokemonLookupTable={pokemonLookupTable}
        />
      }
    </div>
  );
}

export default App;
