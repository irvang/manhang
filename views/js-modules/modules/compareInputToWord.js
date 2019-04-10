
import words from './words.js';

function compareInputToWord(evt) {

  /*To remove listener in a function expression (like a closure), the anonymous function
    needs to be named. Works like a charm! See:
  https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b */


  let letter = evt.target.innerText;//because it is the inner within span

  let remainingTrialsSpan = document.querySelector("#remaining-trials>span");

  this.removeEventListener('click', compareInputToWord);//this === span

  //if letter is not in string, decrease remaining trials and change color to red
  if (!words.single.includes(letter)) {
    words.remainingTrials--;
    this.style.backgroundColor = 'red';
    this.style.color = 'white';
    remainingTrialsSpan.innerHTML = words.remainingTrials; // display remaining trials
    
  } else {
    this.style.backgroundColor = 'chartreuse';

    //changes to current revealed only need to happen when there is a match
    let newRevealed = '';
    for (let i = 0; i < words.single.length; i++) {
      newRevealed += letter === words.single[i] ? letter : words.revealed[i];
    }

    words.revealed = newRevealed;
    document.querySelector('#word-display').innerText = words.revealed;
  }

  if (words.remainingTrials <= 0) {

    remainingTrialsSpan.innerHTML = "Game over";
    document.querySelector('#word-display').innerText = words.single;
    return;
  }
}
// }