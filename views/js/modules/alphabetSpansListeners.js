import compareInputToWord from './compareInputToWord.js';

export { removeAlphabetListeners };

// @desc Adds listeners to alphabet spans (letters) Compares and check if 
// selected letter is in word
// Also in module: compareInputToWord, isGameEnded, removeAlphabetListeners
export default function alphabetSpansListeners() {
  const alphabetSpans = document.querySelectorAll('div.alphabet span');

  for (let i = 0; i < alphabetSpans.length; i++) {
    alphabetSpans[i].addEventListener('click', compareInputToWord);
  }
}

// UNUSED feature, but a way to keep score of user
let localStorage = window.localStorage;
if (!localStorage.hangmanScore) {// if undefined
  console.log('creating localStorage.hangmanScore');
  localStorage.hangmanScore = 0;
}

/* Remove letter's listeners. Happens once the game is finished */
function removeAlphabetListeners() {
  const alphabetSpans = document.querySelectorAll('div.alphabet span');

  for (let i = 0; i < alphabetSpans.length; i++) {
    alphabetSpans[i].removeEventListener('click', compareInputToWord);
  }
}
