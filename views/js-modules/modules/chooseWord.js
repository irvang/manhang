/* selects a random word. The idea is to have fewer globals and a reusable
function that may be passed to listeners*/

export default function chooseWord(ALL_WORDS) {
  // return function () {
    return ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
  // }
}