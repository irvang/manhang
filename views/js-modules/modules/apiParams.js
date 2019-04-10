export default function apiParams(word, chooseWord, createAlphabetSpans, selectNewWord) {

  let selectDifficulty = document.querySelector('#difficulty');
  let selectMinLength = document.querySelector('#min-length');
  let selectMaxLength = document.querySelector('#max-length');

  let sectionParams = document.querySelector('#params');

  sectionParams.addEventListener('change', evt => {
    console.log(selectDifficulty.value,
      selectMinLength.value, selectMaxLength.value);
    fetchDataAndUpdate(
      parseInt(selectDifficulty.value),
      parseInt(selectMinLength.value),
      parseInt(selectMaxLength.value));
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

        //may have to restructure so that gui loads before all the response
        //====Starts game after receiving array
        selectNewWord(bodyAsJson);// passes as ALL_WORDS
        // console.log(typeof bodyAsJson);// passes as ALL_WORDS
      })
      .catch(error => console.log('ERROR: \n', error));
  }

}