'use strict';
function initGame(ALL_WORDS) {

    /* selects a random word. The idea is to have fewer globals and a reusable
    function that may be passed to listeners*/
    const chooseWord = function (ALL_WORDS) {
        return function () {
            return ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
        }
    }(ALL_WORDS);

    /* an object, so it can be passed by reference to the different listeners */
    const word = {
        single: '',
        revealed: ''
    }

    selectNewWord(word, chooseWord)();

    console.log(word.single);

    //====ADD LISTENERS
    //input
    let input = document.querySelector('main>input');
    input.addEventListener('input', checkWords(word));

    const newWordButton = document.querySelector("#new-word");
    newWordButton.addEventListener('click', selectNewWord(word, chooseWord));
    // newWordButton.dispatchEvent(new Event('click'));
}

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

// if (letter === word.single[i]) {
//     newRevealed += letter;
// } else {
//     newRevealed += word.revealed[i];
// }

/*
create a for loop, l oop through lenght of word.

Reveal letter: if word [i] matches letter, add letter in spot of the new blank,
If word[i] === letter, blank[i] = letter
will need temporary word

if all letters match , game should end
if there is no match, there should be an increase in the number of missed, and if it reaches 6, the game should end
*/