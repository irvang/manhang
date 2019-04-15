import state from './state.js';

const wordCheckBox = document.querySelector('.game-mode [value=word]')
const phraseCheckBox = document.querySelector('.game-mode [value=phrase]')
const div = document.querySelector('div.game-mode')
console.log(div);
let x = 12
export default x;
function gameModeListeners() {

  phraseCheckBox.addEventListener(('change'), (evt) => {
    wordCheckBox.checked = !wordCheckBox.checked;
    state.isPhrase = phraseCheckBox.checked;
    console.log(state.isPhrase)
  });
  
  wordCheckBox.addEventListener(('change'), (evt) => {
    phraseCheckBox.checked = !phraseCheckBox.checked;
    state.isPhrase = phraseCheckBox.checked;
    console.log(state.isPhrase)

  });

}

gameModeListeners()