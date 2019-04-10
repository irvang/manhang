import compareInputToWord from './compareInputToWord.js';
import createAlphabetSpans from './createAlphabetSpans.js';
import chooseWord from './chooseWord.js';

import words from './words.js';

export default function selectNewWord() {

  return function () {


    words.single = chooseWord(words.ALL_WORDS);

    console.log('word: ' + words.single);


    //create a string of the lenght of thewords that holds the length of of thewords in blanks
    words.revealed = '';

    //create full blanks, no letterwords.revealed so far
    for (let i = 0; i < words.single.length; i++) {
      words.revealed += '_';
    }

    //check length is same as blanks
    console.log('lenght equal:', words.revealed.length === words.single.length);

    //add blanks to div when newwords is selected
    document.querySelector('#word-display').innerText = words.revealed;

    //clear used letters
    document.querySelector('#display-used-letters').innerHTML = ' ';

    //reset missedwordss
    words.remainingTrials = 6;

    createAlphabetSpans(words, compareInputToWord);
    document.querySelector("#remaining-trials>span").innerHTML = words.remainingTrials;
  }
}