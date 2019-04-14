import alphabetSpansListeners from './alphabetSpansListeners.js';
import { drawCanvas, createPole } from './drawCanvas.js';

import state from './state.js';
import { clearDefinitionsSection } from './fetchDefinition.js';

// @desc Selects a new word from array, 
// Calls to: canvas, drawPole, clearDefinitionsSection, and alphabetSpansListeners
// 
// Used in startGameAddListeners.js and apiParamsListeners.js

export default function selectNewWord() {

  // select random word from array
  state.singleWord = state.ALL_WORDS[Math.floor(Math.random() * state.ALL_WORDS.length)];

  state.revealedWord = ''; // see definition

  //create underscores of the full lenght of word, no letters revealedWord so far
  for (let i = 0; i < state.singleWord.length; i++) {
    state.revealedWord += '_';
  }

  //add blanks to div when newwords is selected
  document.querySelector('#word-display').innerText = state.revealedWord;

  //reset remaining trials
  state.remainingTrials = 6;

  // clear canvas if remaining trials is 6
  drawCanvas(state.remainingTrials);
  createPole();

  clearDefinitionsSection();

  alphabetSpansListeners(); //add listeners that may have been removed

  document.querySelector("#remaining-trials").innerHTML = `Trials: <span>${state.remainingTrials}</span>`;

  const alphabetSpans = document.querySelectorAll('div.alphabet span');

  //remove colors from displayed alphabet
  for (let i = 0; i < alphabetSpans.length; i++) {
    alphabetSpans[i].style = "background-color: '', color: black";
  }

  if (state.isFinished && state.isWon) {
    /* -keep score, 
    -flags should set to false, so if a person 
    presses new word before winning, its score is reset */
    state.isFinished = false;
    state.isWon = false;

  } else {
    /* if game is not finished, or if game has finished but lost:
    -set score to 0, 
    -all flags to false */
    state.isFinished = false;
    state.isWon = false;
    state.consecutiveWins = 0;//reset score

  }

  console.log('word: ' + state.singleWord);
  //check length is same as blanks
  // console.log('lenght equal:', state.revealedWord.length === state.singleWord.length);
}