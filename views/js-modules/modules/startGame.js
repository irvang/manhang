import chooseWord from './chooseWord.js';
import addListeners from './addListeners.js';

//Cached, or so do I think
import words from './words.js';

export default function startGame(ALL_WORDS) {
  /* selects a randomwords. The idea is to have fewer globals and a reusable
function that may be passed to listeners*/
  // const chooseWord = function (ALL_WORDS) {
  //   return function () {
  //     return ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
  //   }
  // }(ALL_WORDS);

  /* an object, so it can be passed by reference to the different listeners */
  words.ALL_WORDS = ALL_WORDS;

  console.log(words);

  //====ADD LISTENERS
  addListeners();
}