import selectNewWord from './selectNewWord.js';
import alphabetSpansListeners from './alphabetSpansListeners.js';
import apiParamsListeners from './apiParamsListeners.js';

// @desc Starts the game. Once the words have been received,
// the functions adds the listeners that allow interaction. 
export default function startGameAddListeners() {

  const newWordButton = document.querySelector("#new-word-b");
  newWordButton.addEventListener('click', selectNewWord);

  //dispatch first time in order to get a random word
  newWordButton.dispatchEvent(new Event('click'));

  alphabetSpansListeners();
  apiParamsListeners();
}