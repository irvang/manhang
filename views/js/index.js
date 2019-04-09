'use strict';
(function () {
    // function initGame(ALL_WORDS) {

    fetchData(10, 2, 10);

}());

/* 
Fetch data receives 3 numbers: difficulty, minLength, maxLength
These are the parameters that are to be the query string on the server side
*/
function fetchData(difficulty, minLength, maxLength) {
    return fetch(`/words/${difficulty}/${minLength}/${maxLength}`)
        // fetch('../words.txt') //faster for testing purposes
        .then(function (response) {
            if (response.ok) {
                return response.text();//a promise
            } else {
                throw new Error('ERROR: Network response wat not ok.');
            }
        })
        .then(text => {

            //may have to restructure so that gui loads before all the response
            //====Starts game after receiving array
            startGame(text.split('\n'));// passes as ALL_WORDS
            console.log(text.split('\n'));// passes as ALL_WORDS
        })
        .catch(function (error) {
            console.log('Looks like there was a problem: \n', error);
        });
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