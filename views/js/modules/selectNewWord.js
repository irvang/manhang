import alphabetSpansListeners from './alphabetSpansListeners.js';
import { drawCanvas, createPole } from './drawCanvas.js';
import state from './state.js';
import fetchDefinition, { clearDefinitionsSection } from './fetchDefinition.js';

// @desc Selects a new word from array
// Calls to: canvas, drawPole, clearDefinitionsSection, and alphabetSpansListeners
// Used in startGameAddListeners.js and apiParamsListeners.js

export default function selectNewWord() {

  // select random word from array

  if (state.isPhrase) {
    let randomIndex = Math.floor(Math.random() * state.ALL_WORDS.length);

    let phraseObject = state.ALL_WORDS[randomIndex];
  
    state.singleWord = phraseObject.word;
    state.definitions = [];
    state.definitions.push (phraseObject.definitions);
    state.provider = phraseObject.provider;

  } else {
    state.singleWord = state.ALL_WORDS[Math.floor(Math.random() * state.ALL_WORDS.length)];

    //fetch and store definition here, to avoid lag
    //display when game finishes
  }

  // happens as soon as word is selected to avoid lag
  fetchDefinition();

  console.log(state)
  //create a string that holds the length of of the words in blanks, 
  // or whatever is revealed so far
  state.revealedWord = '';

  //create underscores of the full lenght of word, no letters revealed so far 
  // i.e.: "_ _ _ _"
  for (let i = 0; i < state.singleWord.length; i++) {
    if (state.singleWord[i] !== ' ') state.revealedWord += '_';
    else state.revealedWord += ' ';
  }

  //add the underscores to div 
  document.querySelector('#word-display').innerText = state.revealedWord;

  //reset remaining trials
  state.remainingTrials = 6;

  // drawCanvas clears the canvas if remaining trials is 6
  drawCanvas(state.remainingTrials);
  createPole(); //draws the pole on canvas

  clearDefinitionsSection();

  alphabetSpansListeners(); //add listeners that may have been removed

  // display remaining trials again, since it may have displayed "Game Over" or "You got it!"
  document.querySelector("#remaining-trials").innerHTML = `Trials: <span>${state.remainingTrials}</span>`;

  const alphabetSpans = document.querySelectorAll('div.alphabet span');

  //remove colors if added on previous game
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

  // //For testing only
  console.log('word: ' + state.singleWord);
  //check length is same as blanks
  // console.log('lenght equal:', state.revealedWord.length === state.singleWord.length);
}