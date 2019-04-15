
import state from './state.js';
import { drawCanvas } from './drawCanvas.js';
import { showDefinitions } from './fetchDefinition.js';
import { removeAlphabetListeners } from './alphabetSpansListeners.js';



export default function compareInputToWord(evt) {

  const remainingTrialsSpan = document.querySelector("#remaining-trials>span");
  const remainingTrialsP = document.getElementById('remaining-trials');

  const letter = evt.target.innerText;//because it is the inner within span

  this.removeEventListener('click', compareInputToWord);//this === span

  /* if letter is in string, change color to greenish chartreuse and reveal the
  matches within the blanks */
  if (state.singleWord.toLowerCase().includes(letter)) {
    this.style.backgroundColor = 'chartreuse';

    /* loop through word, if letter and word[i] match, add the letter to the 
    revealedWord word, if not, add state.revealedWord[i], which is either a 
    blank or a previously matched letter */
    let newRevealed = '';
    for (let i = 0; i < state.singleWord.length; i++) {
      newRevealed += letter === state.singleWord[i].toLowerCase() ? state.singleWord[i] : state.revealedWord[i];
    }

    // replace revealedWord is state object
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
      showDefinitions();//will happen as soon as word is selected to avoid lag

      //raise flag and increase
      state.isFinished = true;
      state.consecutiveWins++;
      state.isWon = true;

      if (state.consecutiveWins > parseInt(localStorage.hangmanScore)) {

        localStorage.hangmanScore = state.consecutiveWins;
        console.log('updating localStorage winning', localStorage.hangmanScore);
      }
    }
    return;//only to avoid next part
  }

  if (state.remainingTrials <= 0) {
    remainingTrialsP.innerHTML = "Game over<span></span>";
    document.querySelector('#word-display').innerText = state.singleWord;
    removeAlphabetListeners()

    if (!state.isFinished) {
      showDefinitions();

      //raise flag and do not increase
      state.isFinished = true;
      /* no updating when losing, since it would have been updated when won */
    }

    return;// no real use here, just to avoid next line
  }
}