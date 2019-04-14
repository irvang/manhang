// import compareInputToWord from './compareInputToWord.js';

import state from './state.js';
import { drawCanvas } from './drawCanvas.js';
import fetchDefinition from './fetchDefinition.js';

/* 
Adds listeners to spans
Compares input to word
*/

export default function alphabetSpansListeners() {
  const alphabetSpans = document.querySelectorAll('div.alphabet span');

  for (let i = 0; i < alphabetSpans.length; i++) {
    alphabetSpans[i].addEventListener('click', compareInputToWord);
  }
}

let localStorage = window.localStorage;

// localStorage.clear()
// localStorage.hangmanScore = 0;

if (!localStorage.hangmanScore) {// if undefined
  console.log('creating localStorage.hangmanScore');
  localStorage.hangmanScore = 0;
} else {
  // console.log('localStorage.hangmanScore exists');
}


function compareInputToWord(evt) {
  
  const remainingTrialsSpan = document.querySelector("#remaining-trials>span");
  const remainingTrialsP = document.getElementById('remaining-trials');

  /*To remove listener in a function expression (like a closure), the anonymous function
    needs to be named. Works like a charm! See:
  https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b */


  const letter = evt.target.innerText;//because it is the inner within span

  this.removeEventListener('click', compareInputToWord);//this === span


  /* if letter is in string, change color to greenish chartreuse and reveal the
  matches within the blanks */
  if (state.singleWord.includes(letter)) {
    this.style.backgroundColor = 'chartreuse';

    /* loop through word, if letter and word[i] match, add the letter to the 
    revealedWord word, if not, add state.revealedWord[i], which is either a blank or 
    any previously matched letter */
    let newRevealed = '';
    for (let i = 0; i < state.singleWord.length; i++) {
      newRevealed += letter === state.singleWord[i] ? letter : state.revealedWord[i];
    }

    state.revealedWord = newRevealed;
    document.querySelector('#word-display').innerText = state.revealedWord;
  } else {
    //if letter is not in string, decrease remaining trials and change color to red
    state.remainingTrials--;
    this.style.backgroundColor = 'red';
    this.style.color = 'white';
    remainingTrialsSpan.innerHTML = state.remainingTrials; // display remaining trials
    drawCanvas(state.remainingTrials);

  }

  isGameEnded(remainingTrialsP);

}

function isGameEnded(remainingTrialsP) {


  if (state.revealedWord === state.singleWord) {
    //span after text is needed so no error is thrown if the listeners 
    // are resued after ending game, a bit sketchy ...
    remainingTrialsP.innerHTML = "You got it!<span></span>";
    removeAlphabetListeners() 
    /* isFinished used to keep track of whether the score should increase or not
    if finished, it prevents score from increasing */
    if (!state.isFinished) {
      fetchDefinition(state.singleWord);

      //raise flag and increase
      state.isFinished = true;
      state.consecutiveWins++;
      state.isWon = true;

      if (state.consecutiveWins > parseInt(localStorage.hangmanScore)) {

        localStorage.hangmanScore = state.consecutiveWins;
        console.log('updating localStorage winning', localStorage.hangmanScore);
      }
    }
    return;
  }

  if (state.remainingTrials <= 0) {
    remainingTrialsP.innerHTML = "Game over<span></span>";
    document.querySelector('#word-display').innerText = state.singleWord;
    removeAlphabetListeners() 

    if (!state.isFinished) {
      fetchDefinition(state.singleWord);
      
      //raise flag and do not increase
      state.isFinished = true;
      /* no updating when losing, since it would have been updated when won */
    }

    return;
  }
}

/* Remove listeners happens once the game is finished */
function removeAlphabetListeners() {
  const alphabetSpans = document.querySelectorAll('div.alphabet span');

  for (let i = 0; i < alphabetSpans.length; i++) {
    alphabetSpans[i].removeEventListener('click', compareInputToWord);
  }
}