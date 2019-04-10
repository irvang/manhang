import chooseWord from './chooseWord.js';
import addListeners from './addListeners.js';


export default function startGame(ALL_WORDS) {
  /* selects a random word. The idea is to have fewer globals and a reusable
function that may be passed to listeners*/
  // const chooseWord = function (ALL_WORDS) {
  //   return function () {
  //     return ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
  //   }
  // }(ALL_WORDS);

  /* an object, so it can be passed by reference to the different listeners */
  const word = {
    single: '',
    revealed: '',
    remainingTrials: 6
  }

  console.log(word.single);

  //====ADD LISTENERS
  addListeners(word, chooseWord(ALL_WORDS));
}