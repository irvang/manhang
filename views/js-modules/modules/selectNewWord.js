import alphabetSpansListeners from './alphabetSpansListeners.js';

import words from './words.js';

/* 
Used in startGameAddListeners.js and apiParamsListeners.js
*/
export default function selectNewWord() {

    words.single = words.ALL_WORDS[Math.floor(Math.random() * words.ALL_WORDS.length)];

    //create a string of the lenght of thewords that holds the length of of thewords in blanks
    words.revealed = '';

    //create full blanks, no letterwords.revealed so far
    for (let i = 0; i < words.single.length; i++) {
      words.revealed += '_';
    }

    //add blanks to div when newwords is selected
    document.querySelector('#word-display').innerText = words.revealed;

    //reset missedwordss
    words.remainingTrials = 6;

    alphabetSpansListeners();
    document.querySelector("#remaining-trials>span").innerHTML = words.remainingTrials;

    console.log('word: ' + words.single);
    //check length is same as blanks
    console.log('lenght equal:', words.revealed.length === words.single.length);
}