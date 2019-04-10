/* selects a random word. The idea is to have fewer globals and a reusable
function that may be passed to listeners*/

import words from './words.js';

export default function chooseWord() {
  return words.ALL_WORDS[Math.floor(Math.random() * words.ALL_WORDS.length)];
}