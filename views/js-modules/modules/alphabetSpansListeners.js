// import compareInputToWord from './compareInputToWord.js';

import words from './words.js';

function compareInputToWord(evt) {

  /*To remove listener in a function expression (like a closure), the anonymous function
    needs to be named. Works like a charm! See:
  https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b */


  const letter = evt.target.innerText;//because it is the inner within span

  const remainingTrialsSpan = document.querySelector("#remaining-trials>span");
  const remainingTrialsP = document.querySelector('#remaining-trials');

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

  }


  if (words.revealed === words.single) {
    //span after text is needed so no error is thrown if the listeners 
    // are resued after ending game, a bit sketchy ...
    remainingTrialsP.innerHTML = "You got it!<span></span>";
    return;
  }


  if (words.remainingTrials <= 0) {
    remainingTrialsP.innerHTML = "Game over<span></span>";
    document.querySelector('#word-display').innerText = words.single;
    return;
  }
}


export default function alphabetSpansListeners() {
  const alphabetSpans = document.querySelectorAll('div.alphabet span');

  for (let i = 0; i < alphabetSpans.length; i++) {
    alphabetSpans[i].addEventListener('click', compareInputToWord);
  }
}
