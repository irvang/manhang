export default function compareInputToWord(word) {

  /*To remove listener in an anonymous function (like a closure), the anonymous function
    needs to be named. Works like a charm! See:
  https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b */
  return function innerListen(evt) {
    let letter = evt.target.innerText;//because it is the inner within span


    let remainingTrialsSpan = document.querySelector("#remaining-trials>span");

    this.removeEventListener('click', innerListen);//this === span

    //if letter is not in string, decrease remaining trials and change color to red
    if (!word.single.includes(letter)) {
      word.remainingTrials--;
      this.style.backgroundColor = 'red';
      this.style.color = 'white';

      remainingTrialsSpan.innerHTML = word.remainingTrials; // display remaining trials
    } else {
      this.style.backgroundColor = 'chartreuse';

      //changes to current revealed only need to happen when there is a match
      let newRevealed = '';
      for (let i = 0; i < word.single.length; i++) {
        newRevealed += letter === word.single[i] ? letter : word.revealed[i];
      }

      word.revealed = newRevealed;
      document.querySelector('#word-display').innerText = word.revealed;
    }

    if (word.remainingTrials <= 0) {

      remainingTrialsSpan.innerHTML = "Game over";
      document.querySelector('#word-display').innerText = word.single;
      return;
    }
  }
}