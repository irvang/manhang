// import compareInputToWord from './compareInputToWord.js';

import words from './words.js';
import { drawCanvas } from './drawCanvas.js';

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
  console.log('localStorage.hangmanScore exists');
}

const remainingTrialsSpan = document.querySelector("#remaining-trials>span");
const remainingTrialsP = document.querySelector('#remaining-trials');

function compareInputToWord(evt) {

  /*To remove listener in a function expression (like a closure), the anonymous function
    needs to be named. Works like a charm! See:
  https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b */


  const letter = evt.target.innerText;//because it is the inner within span

  this.removeEventListener('click', compareInputToWord);//this === span


  /* if letter is in string, change color to greenish chartreuse and reveal the
  matches within the blanks */
  if (words.single.includes(letter)) {
    this.style.backgroundColor = 'chartreuse';

    /* loop through word, if letter and word[i] match, add the letter to the 
    revealed word, if not, add words.revealed[i], which is either a blank or 
    any previously matched letter */
    let newRevealed = '';
    for (let i = 0; i < words.single.length; i++) {
      newRevealed += letter === words.single[i] ? letter : words.revealed[i];
    }

    words.revealed = newRevealed;
    document.querySelector('#word-display').innerText = words.revealed;
  } else {
    //if letter is not in string, decrease remaining trials and change color to red
    words.remainingTrials--;
    this.style.backgroundColor = 'red';
    this.style.color = 'white';
    remainingTrialsSpan.innerHTML = words.remainingTrials; // display remaining trials
    drawCanvas(words.remainingTrials);

  }

  isGameEnded();

}

function isGameEnded() {
  if (words.revealed === words.single) {
    //span after text is needed so no error is thrown if the listeners 
    // are resued after ending game, a bit sketchy ...
    remainingTrialsP.innerHTML = "You got it!<span></span>";

    /* isFinished used to keep track of whether the score should increase or not
    if finished, it prevents score from increasing */
    if (!words.isFinished) {
      //raise flag and increase
      words.isFinished = true;
      words.consecutiveWins++;
      words.isWon = true;

      if (words.consecutiveWins > parseInt(localStorage.hangmanScore)) {

        localStorage.hangmanScore = words.consecutiveWins;
        console.log('updating localStorage winning', localStorage.hangmanScore);
      }
    }
    return;
  }

  if (words.remainingTrials <= 0) {
    remainingTrialsP.innerHTML = "Game over<span></span>";
    document.querySelector('#word-display').innerText = words.single;

    if (!words.isFinished) {
      //raise flag and do not increase
      words.isFinished = true;
      /* no updating when losing, since it would have been updated when won */
    }

    return;
  }
}