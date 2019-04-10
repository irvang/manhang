
import compareInputToWord from './compareInputToWord.js';
import selectNewWord from './selectNewWord.js';
import createAlphabetSpans from './compareInputToWord.js';


export default function addListeners(word, ALL_WORDS) {


  //===LISTENERS
  // let input = document.querySelector('main>input');
  // input.addEventListener('input', compareInputToWord(word));

  const newWordButton = document.querySelector("#new-word-b");

  newWordButton.addEventListener('click',
    selectNewWord(word));

  newWordButton.dispatchEvent(new Event('click')); //dispatch first time

  createAlphabetSpans(word);
}