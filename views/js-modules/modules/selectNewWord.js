import compareInputToWord from './compareInputToWord.js';
import createAlphabetSpans from './createAlphabetSpans.js';


export default function selectNewWord(word, chooseWord) {

  return function () {


    word.single = chooseWord();;

    console.log('word: ' + word.single);


    //create a string of the lenght of the word that holds the length of of the word in blanks
    word.revealed = '';

    //create full blanks, no letter word.revealed so far
    for (let i = 0; i < word.single.length; i++) {
      word.revealed += '_';
    }

    //check length is same as blanks
    console.log('lenght equal:', word.revealed.length === word.single.length);

    //add blanks to div when new word is selected
    document.querySelector('#word-display').innerText = word.revealed;

    //clear used letters
    document.querySelector('#display-used-letters').innerHTML = ' ';

    //reset missed words
    word.remainingTrials = 6;

    createAlphabetSpans(word, compareInputToWord);
    document.querySelector("#remaining-trials>span").innerHTML = word.remainingTrials;
  }
}