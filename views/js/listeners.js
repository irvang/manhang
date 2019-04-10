function addListeners(word, chooseWord) {

  //===LISTENERS
  // let input = document.querySelector('main>input');
  // input.addEventListener('input', compareInputToWord(word));

  const newWordButton = document.querySelector("#new-word-b");
  newWordButton.addEventListener('click',
    selectNewWord(word, chooseWord, createAlphabetSpans));
  newWordButton.dispatchEvent(new Event('click')); //dispatch first time

  createAlphabetSpans(word, compareInputToWord);




  //====LISTENER FUNCTIONS
  function compareInputToWord(word) {

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


  function selectNewWord(word, chooseWord, createAlphabetSpans) {

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

      //UNUSED - using flexbox - insert break every 5, not on the first (i!==0) or on the last (ALPHABET[last])
      if (i % 5 === 0 && i !== 0 && (i !== ALPHABET.length - 1)) {
        // alphabetDiv.innerHTML += '<br>';//something with the breaks does not allow adding listeners
      }
      span.addEventListener('click', compareInputToWord(word));
      span.innerHTML = ALPHABET[i];
      alphabetDiv.append(span);

    }
  }

  function apiParams(word, chooseWord, createAlphabetSpans, selectNewWord) {

    let selectDifficulty = document.querySelector('#difficulty');
    let selectMinLength = document.querySelector('#min-length');
    let selectMaxLength = document.querySelector('#max-length');

    let sectionParams = document.querySelector('#params');

    sectionParams.addEventListener('change', evt => {
      console.log(selectDifficulty.value,
        selectMinLength.value, selectMaxLength.value);
      fetchDataAndUpdate(
        parseInt(selectDifficulty.value),
        parseInt(selectMinLength.value),
        parseInt(selectMaxLength.value));
    });

    function fetchDataAndUpdate(difficulty, minLength, maxLength) {
      //should update
      return fetch(`/words/${difficulty}/${minLength}/${maxLength}`)
        .then(function (response) {
          if (response.ok) {
            // console.log(typeof response)
            return response.json();//a promise, convert to object
          }
        })
        .then(bodyAsJson => {

          //may have to restructure so that gui loads before all the response
          //====Starts game after receiving array
          selectNewWord(bodyAsJson);// passes as ALL_WORDS
          // console.log(typeof bodyAsJson);// passes as ALL_WORDS
        })
        .catch(error => console.log('ERROR: \n', error));
    }

  }

}

/*
Will listeners be removed or stacked when reusing createAlphabetspans?
How to modularize better in vanilla js?
*/