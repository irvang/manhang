'use strict';
(function () {
    // function initGame(ALL_WORDS) {

    //difficulty 1-10
    // minLength 3-12
    // maxLength 3-12
    fetchDataAndStart(1, 0, 50);

    // apiParams();

}());

/* 
Fetch data receives 3 numbers: difficulty, minLength, maxLength
These are the parameters that are to be the query string on the server side
*/
function fetchDataAndStart(difficulty, minLength, maxLength) {
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
            // console.log(typeof bodyAsJson);// passes as ALL_WORDS
        })
        .catch(error => console.log('ERROR: \n', error));
}

function startGame(ALL_WORDS) {
    /* selects a random word. The idea is to have fewer globals and a reusable
 function that may be passed to listeners*/
    const chooseWord = function (ALL_WORDS) {
        return function () {
            return ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
        }
    }(ALL_WORDS);

    /* an object, so it can be passed by reference to the different listeners */
    const word = {
        single: '',
        revealed: '',
        remainingTrials: 6
    }

    console.log(word.single);

    //====ADD LISTENERS
    addListeners(word, chooseWord);
}

