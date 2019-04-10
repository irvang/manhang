export default function createAlphabetSpans(word, compareInputToWord) {

  const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  const alphabetDiv = document.querySelector('div.alphabet');
  alphabetDiv.innerHTML = '';//concern is whether listeners will be removed or stack

  for (let i = 0; i < ALPHABET.length; i++) {
    const span = document.createElement('span');

    //UNUSED - using flexbox - insert break every 5, not on the first (i!==0) or on the last (ALPHABET[last])
    if (i % 5 === 0 && i !== 0 && (i !== ALPHABET.length - 1)) {
      // alphabetDiv.innerHTML += '<br>';//something with the breaks does not allow adding listeners
    }
    span.addEventListener('click', compareInputToWord(word));
    span.innerHTML = ALPHABET[i];
    alphabetDiv.append(span);

  }
}