import axios from 'axios';

export function getBulbasaur() {
  //return axios.get("/well/");
  return axios.get("/pokemon/");
}
