import compareInputToWord from './compareInputToWord.js';

export default function alphabetSpansListeners() {

  const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
/* 
  const alphabetDiv = document.querySelector('div.alphabet');
  alphabetDiv.innerHTML = '';//concern is whether listeners will be removed or stack

  for (let i = 0; i < ALPHABET.length; i++) {
    const span = document.createElement('span');

    span.addEventListener('click', compareInputToWord);
    span.innerHTML = ALPHABET[i];
    alphabetDiv.append(span);

  }
 */
  const alphabetSpans = document.querySelectorAll('div.alphabet span');

  for (let i = 0; i< alphabetSpans.length ; i++ ){
    alphabetSpans[i].addEventListener('click', compareInputToWord);
  }
}