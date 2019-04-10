import alphabetSpansListeners from './alphabetSpansListeners.js';

import words from './words.js';

/* 
Used in startGameAddListeners.js and apiParamsListeners.js
*/
export default function selectNewWord() {

  words.single = words.ALL_WORDS[Math.floor(Math.random() * words.ALL_WORDS.length)];

  words.revealed = ''; // see definition

  //create underscores of the full lenght of word, no letters revealed so far
  for (let i = 0; i < words.single.length; i++) {
    words.revealed += '_';
  }

  //add blanks to div when newwords is selected
  document.querySelector('#word-display').innerText = words.revealed;

  //reset remaining trials
  words.remainingTrials = 6;

  alphabetSpansListeners(); //add listeners that may have been removed

  document.querySelector("#remaining-trials").innerHTML = `Remaining trials:<span>${words.remainingTrials}</span>`

  const alphabetSpans = document.querySelectorAll('div.alphabet span');

  for (let i = 0; i < alphabetSpans.length; i++) {
    alphabetSpans[i].style = "background-color: '', color: black ";
  }


  console.log('word: ' + words.single);
  //check length is same as blanks
  console.log('lenght equal:', words.revealed.length === words.single.length);
}