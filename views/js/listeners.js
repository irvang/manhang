function addListeners(word, chooseWord) {

  //===LISTENERS
  let input = document.querySelector('main>input');
  input.addEventListener('input', checkWords(word));

  const newWordButton = document.querySelector("#new-word");
  newWordButton.addEventListener('click', selectNewWord(word, chooseWord));
  newWordButton.dispatchEvent(new Event('click')); //dispatch first time

  //====LISTENER FUNCTIONS
  function checkWords(word) {

    //displays used letters
    let displayUsedLettersP = document.querySelector('#display-used-letters');

    return function (evt) {
      let letter = evt.target.value;
      displayUsedLettersP.innerHTML += letter + " ";
      this.value = '';// this === input

      let newRevealed = '';
      for (let i = 0; i < word.single.length; i++) {
        newRevealed += letter === word.single[i] ? letter : word.revealed[i];
      }

      word.revealed = newRevealed;

      document.querySelector('#word-display').innerText = word.revealed;
    }
  }

  function selectNewWord(word, chooseWord) {

    return function () {


      word.single = chooseWord();;

      console.log('word: ' + word.single);


      //create a string of the lenght of the word that holds the length of of the word in blanks
      word.revealed = '';

      //create full blanks, no letter word.revealed so far
      for (let i = 0; i < word.single.length; i++) {
        word.revealed += '_';
      }

      //check length is same as blanks
      console.log('lenght equal:', word.revealed.length === word.single.length);

      //add blanks to div when new word is selected
      document.querySelector('#word-display').innerText = word.revealed;

      //clear used letters
      document.querySelector('#display-used-letters').innerHTML = '';

    }
  }
}