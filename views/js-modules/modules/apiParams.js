import selectNewWord from './selectNewWord.js';
import words from './words.js';

// UNUSED SO FAR
export default function apiParams() {
  // export default function apiParams(word, chooseWord, alphabetSpansListeners, selectNewWord) {

  let selectDifficulty = document.querySelector('#difficulty');
  let selectMinLength = document.querySelector('#min-length');
  let selectMaxLength = document.querySelector('#max-length');

  let sectionParams = document.querySelector('#params');

  sectionParams.addEventListener('change', evt => {
    console.log(selectDifficulty.value,
      selectMinLength.value, parseInt(selectMaxLength.value) + 1);
    fetchDataAndUpdate(
      parseInt(selectDifficulty.value),
      parseInt(selectMinLength.value),
      parseInt(selectMaxLength.value) + 1);
  });

  function fetchDataAndUpdate(difficulty, minLength, maxLength) {
    //should update
    return fetch(`/words/${difficulty}/${minLength}/${maxLength}`)
      .then(function (response) {
        if (response.ok) {
          // console.log(typeof response)
          return response.json();//a promise, convert to object
        }
      })
      .then(bodyAsJson => {

        words.ALL_WORDS = bodyAsJson;
        //may have to restructure so that gui loads before all the response
        //====Starts game after receiving array
        selectNewWord();// passes as ALL_WORDS
        // console.log(typeof bodyAsJson);// passes as ALL_WORDS
      })
      .catch(error => console.log('ERROR: \n', error));
  }

}