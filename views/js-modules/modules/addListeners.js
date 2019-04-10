import selectNewWord from './selectNewWord.js';
import alphabetSpansListeners from './alphabetSpansListeners.js';
import apiParamsListeners from './apiParamsListeners.js';


export default function addListeners() {

  const newWordButton = document.querySelector("#new-word-b");
  newWordButton.addEventListener('click', selectNewWord);

  //dispatch first time in order to get a random word
  newWordButton.dispatchEvent(new Event('click'));

  alphabetSpansListeners();
  apiParamsListeners();
}