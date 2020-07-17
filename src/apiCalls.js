import axios from 'axios';

export function getBulbasaur() {
  return axios.get("/pokemon/bulbasaur/");
}
