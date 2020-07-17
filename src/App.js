import React, {useEffect, useState} from 'react';
import Pokedex from "./Pokedex";
import {getBulbasaur} from "./apiCalls";

function App() {

  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    getBulbasaur()
      .then(res=>{
        console.log(res.data);
        setPokemon(res.data);
      })
  },[]); // [] for deps means this useEffect will only trigger once

  return (
    <div className="App">
      <div id="heading">
        Code Challenge - Blue Squad
      </div>
      <Pokedex pokemon={pokemon}/>
    </div>
  );
}

export default App;
