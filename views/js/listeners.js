function addListeners(word, chooseWord) {

  //===LISTENERS
  // let input = document.querySelector('main>input');
  // input.addEventListener('input', compareInputToWord(word));

  const newWordButton = document.querySelector("#new-word-b");
  newWordButton.addEventListener('click', selectNewWord(word, chooseWord));
  newWordButton.dispatchEvent(new Event('click')); //dispatch first time

  createAlphabetSpans(word, compareInputToWord);


  //====LISTENER FUNCTIONS
  function compareInputToWord(word) {

    //displays used letters
    let displayUsedLettersP = document.querySelector('#display-used-letters');

    return function (evt) {
      // let letter = evt.target.value;
      let letter = evt.target.innerText;
      // displayUsedLettersP.innerHTML += letter + " ";

      let remainingTrialsSpan = document.querySelector("#remaining-trials>span");

      this.removeEventListener('click', compareInputToWord(word))

      //if letter is not in string
      if (!word.single.includes(letter)) {
        word.remainingTrials--;
        this.style.backgroundColor = 'red';
        this.style.color = 'white';

        remainingTrialsSpan.innerHTML = word.remainingTrials;
      } else {
        this.style.backgroundColor = 'chartreuse';
      }

      console.log(word.remainingTrials)
      if (word.remainingTrials <= 0) {
      
        remainingTrialsSpan.innerHTML = "Game over";
        document.querySelector('#word-display').innerText = word.single;
        return;
      }

      let newRevealed = '';
      for (let i = 0; i < word.single.length; i++) {
        // newRevealed += letter === word.single[i] ? letter : word.revealed[i];

        if (letter === word.single[i]) {
          newRevealed += letter;
        } else {
          newRevealed += word.revealed[i];
        }
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
      document.querySelector('#display-used-letters').innerHTML = ' ';

      //reset missed words
      word.remainingTrials = 6;

      createAlphabetSpans(word, compareInputToWord);
      document.querySelector("#remaining-trials>span").innerHTML = word.remainingTrials;
    }
  }


  function createAlphabetSpans(word, compareInputToWord) {

    const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
      'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const alphabetDiv = document.querySelector('div.alphabet');
    alphabetDiv.innerHTML = '';//concern is whether listeners will be removed or stack

    for (let i = 0; i < ALPHABET.length; i++) {
      const span = document.createElement('span');

      //insert break every 5, not on the first (i!==0) or on the last (ALPHABET[last])
      if (i % 5 === 0 && i !== 0 && (i !== ALPHABET.length - 1)) {
        // alphabetDiv.innerHTML += '<br>';//something with the breaks does not allow adding listeners
      }
      span.addEventListener('click', compareInputToWord(word));
      span.innerHTML = ALPHABET[i];
      alphabetDiv.append(span);

    }
  }


}

/*
Will listeners be removed or stacked when reusing createAlphabetspans
*/