/* 
  A "global" object to handle all words-related data.
  I believe (from my short research) it is cached, which is why I am doing it this way.
*/

//====STATE
const state = {
  singleWord: '',

  //create a string that holds the length of of the words in blanks, or whatever is revealed so far
  revealedWord: '',
  remainingTrials: 6,
  ALL_WORDS: [],//dummy, will be replaced with a clone of the response
  consecutiveWins: 0,
  isFinished: false,
  isWon: false
}

export default state;
