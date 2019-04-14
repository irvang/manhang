import alphabetSpansListeners from './alphabetSpansListeners.js';
import { drawCanvas, createPole } from './drawCanvas.js';

import words from './words.js';
import { clearDefinitionsSection } from './fetchDefinition.js';

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

  // clear canvas if remaining trials is 6
  drawCanvas(words.remainingTrials);
  createPole();

  clearDefinitionsSection();

  alphabetSpansListeners(); //add listeners that may have been removed

  document.querySelector("#remaining-trials").innerHTML = `Remaining trials: <span>${words.remainingTrials}</span>`;

  const alphabetSpans = document.querySelectorAll('div.alphabet span');

  //remove colors from displayed alphabet
  for (let i = 0; i < alphabetSpans.length; i++) {
    alphabetSpans[i].style = "background-color: '', color: black";
  }

  if (words.isFinished && words.isWon) {
    /* -keep score, 
    -flags should set to false, so if a person 
    presses new word before winning, its score is reset */
    words.isFinished = false;
    words.isWon = false;

  } else {
    /* if game is not finished, or if game has finished but lost:
    -set score to 0, 
    -all flags to false */
    words.isFinished = false;
    words.isWon = false;
    words.consecutiveWins = 0;//reset score

  }

  console.log('word: ' + words.single);
  //check length is same as blanks
  // console.log('lenght equal:', words.revealed.length === words.single.length);
}