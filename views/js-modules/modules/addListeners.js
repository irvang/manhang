
import compareInputToWord from './compareInputToWord.js';
import selectNewWord from './selectNewWord.js';
import createAlphabetSpans from './compareInputToWord.js';


export default function addListeners(word, chooseWord) {


  //===LISTENERS
  // let input = document.querySelector('main>input');
  // input.addEventListener('input', compareInputToWord(word));

  const newWordButton = document.querySelector("#new-word-b");

  newWordButton.addEventListener('click',
    selectNewWord(word, chooseWord));

  newWordButton.dispatchEvent(new Event('click')); //dispatch first time

  createAlphabetSpans(word);
}