import React, {useEffect, useState} from 'react';
import Pokedex from "./Pokedex";
import {getBulbasaur} from "./apiCalls";

function App() {

  const [pokemon, setPokemon] = useState([]);       // array to store pokemon from API
  const [displayNum, setDisplayNum] = useState(1);  // keeps track of current pokemon being displayed

  // runs once to initilize app with our first pokemon
  useEffect(() => {
    getBulbasaur()
      .then(res=>{
        console.log(res.data);
        setPokemon(res.data);
      })
  },[]);

  return (
    <div className="App">
      <div id="heading">
        Code Challenge - Blue Squad
      </div>
      <Pokedex
        pokemon={pokemon}
        displayNum={displayNum}/>
    </div>
  );
}

export default App;
