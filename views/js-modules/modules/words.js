/* 
  A "global" object to handle all words-related data.
  I believe (from my short research) it is cached, which is why I am doing it this way.
*/

const words = {
  single: '',
  revealed: '',
  remainingTrials: 6,
  ALL_WORDS: []//dummy, will be replaced with filtered data
}

export default words;
