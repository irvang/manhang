import startGameAddListeners from './startGameAddListeners.js';
import state from './state.js';
import { disableSelects, enableSelects } from './apiParamsListeners.js';


const selectDifficulty = document.querySelector('#difficulty');
const selectMinLength = document.querySelector('#min-length');
const selectMaxLength = document.querySelector('#max-length');

const wordDisplay = document.querySelector('#word-display');

// @desc Fetch data receives 3 numbers: difficulty, minLength, maxLength
// These parameters are the query string on the request to Reach API.
// used only at on index.js to start game
export function fetchDataAndStart() {

  //Sends a request to the server, which in turn sends another request to
  // http://app.linkedin-reach.io/words with the specified parameters as query string


  const difficulty = parseInt(selectDifficulty.value);
  const minLength = parseInt(selectMinLength.value);

  /* Adding one to make interface more intuitive for user. */
  const maxLength = parseInt(selectMaxLength.value) + 1;

  let url = '';

  if (state.isPhrase) {
    url = '/words/phrases';
    wordDisplay.style.fontSize = '1.0rem';
    disableSelects();
  } else {
    url = `/words/${difficulty}/${minLength}/${maxLength}`;
    wordDisplay.style.fontSize = '1.7rem';
    enableSelects();
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
      startGameAddListeners();// uses state.ALL_WORDS
    })
    .catch(error => console.log('ERROR: \n', error));
}
