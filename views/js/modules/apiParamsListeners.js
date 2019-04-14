import selectNewWord from './selectNewWord.js';
import state from './state.js';

// @desc Fetches data with parameters applied. 
// The parameters are: difficulty, minLength, maxLength, since those seem to be the more intuitive
// maxLength is added 1 (maxLength +=1) for a more intuitive GUI. i.e. 12  
// normally fetches words of max length of 11, adding one to 12 (13) fetches words
// of max lenght 12
export default function apiParamsListeners() {

  let selectDifficulty = document.querySelector('#difficulty');
  let selectMinLength = document.querySelector('#min-length');
  let selectMaxLength = document.querySelector('#max-length');

  let sectionParams = document.querySelector('#params');

  sectionParams.addEventListener('change', evt => {

    const difficulty = parseInt(selectDifficulty.value);
    const minLength = parseInt(selectMinLength.value);

    /* Adding one to make interface more intuitive for user. */
    const maxLength = parseInt(selectMaxLength.value) + 1;

    //fetch data with new parameters
    fetch(`/words/${difficulty}/${minLength}/${maxLength}`)
      .then(function (response) {
        if (response.ok) {
          // console.log(typeof response)
          return response.json();//a promise, convert to object
        }
      })
      .then(bodyAsJson => {

        state.ALL_WORDS = [...bodyAsJson];

        // udpates/restarts game with the selected parameters
        selectNewWord();// passes as ALL_WORDS
      })
      .catch(error => console.log('ERROR: \n', error));
  })
}
