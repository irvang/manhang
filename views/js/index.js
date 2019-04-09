'use strict';
function initGame(ALL_WORDS) {

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
        missedCount: 0
    }

    console.log(word.single);

    //====ADD LISTENERS
    addListeners(word, chooseWord);


    const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const alphabetDiv = document.querySelector('div.alphabet');
    let isFirstTime = true;

    for (let i = 0; i < ALPHABET.length; i++) {
        
        if (i % 5 === 0 && i !== 0 && i !== ALPHABET.length-1) {
            alphabetDiv.innerHTML += '<br>';
        }
        alphabetDiv.innerHTML += '<span>' + ALPHABET[i] + '</span>';

    }
}