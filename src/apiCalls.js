import axios from 'axios';

/*
*     Functions for making calls to the PokeAPI
*     Calls can't be made directly from client due to CORS
*     Therefore the Express server is used as a proxy
* */

// get pokemon by id number
export function getPokemon(displayNum) {
  return axios.get("/pokemon/"+displayNum+"/");
}
