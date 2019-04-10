import alphabetSpansListeners from './alphabetSpansListeners.js';
import chooseWord from './chooseWord.js';
import words from './words.js';

export default function selectNewWord() {

    words.single = chooseWord();

    //create a string of the lenght of thewords that holds the length of of thewords in blanks
    words.revealed = '';

    //create full blanks, no letterwords.revealed so far
    for (let i = 0; i < words.single.length; i++) {
      words.revealed += '_';
    }

    //add blanks to div when newwords is selected
    document.querySelector('#word-display').innerText = words.revealed;

    //clear used letters
    document.querySelector('#display-used-letters').innerHTML = ' ';

    //reset missedwordss
    words.remainingTrials = 6;

    alphabetSpansListeners();
    document.querySelector("#remaining-trials>span").innerHTML = words.remainingTrials;

    console.log('word: ' + words.single);
    //check length is same as blanks
    console.log('lenght equal:', words.revealed.length === words.single.length);
}