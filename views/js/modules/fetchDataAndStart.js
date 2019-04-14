import startGameAddListeners from './startGameAddListeners.js';
import state from './state.js';


// @desc Fetch data receives 3 numbers: difficulty, minLength, maxLength
// These parameters are the query string on the request to Reach API.
// used only at on index.js to start game

export function fetchDataAndStart(difficulty, minLength, maxLength) {

  //Sends a request to the server, which in turn sends another request to
  // http://app.linkedin-reach.io/words with the specified parameters as query string

  let url = '';

  if (state.isPhrase) {
    url = '/words/phrases';
  } else {
    url = `/words/${difficulty}/${minLength}/${maxLength}`;
  }


  return fetch(url)
    .then(function (response) {
      if (response.ok) {

        return response.json();//a promise, convert to object
      }
    })
    .then(bodyAsJson => {

      //may have to restructure so that gui loads before all the response
      //====Starts game after receiving array
      state.ALL_WORDS = [...bodyAsJson];//clone array, not a reference
console.log(state.ALL_WORDS)
      startGameAddListeners();// uses state.ALL_WORDS
    })
    .catch(error => console.log('ERROR: \n', error));
}
