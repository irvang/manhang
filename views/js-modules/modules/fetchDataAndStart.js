import startGame from './startGame.js';

/* 
Fetch data receives 3 numbers: difficulty, minLength, maxLength
These are the parameters that are to be the query string on the server side
*/
export function fetchDataAndStart(difficulty, minLength, maxLength) {
  // fetch('../words.txt') //faster for testing purposes
  return fetch(`/words/${difficulty}/${minLength}/${maxLength}`)
    .then(function (response) {
      if (response.ok) {
        // console.log(typeof response)
        return response.json();//a promise, convert to object
      }
    })
    .then(bodyAsJson => {

      //may have to restructure so that gui loads before all the response
      //====Starts game after receiving array

      startGame(bodyAsJson);// passes as ALL_WORDS
      // console.log(bodyAsJson);// passes as ALL_WORDS
    })
    .catch(error => console.log('ERROR: \n', error));
}
