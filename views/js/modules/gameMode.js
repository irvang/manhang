import state from './state.js';
import { fetchDataAndStart } from './fetchDataAndStart.js';

const wordCheckBox = document.querySelector('.game-mode [value=word]');
const phraseCheckBox = document.querySelector('.game-mode [value=phrase]');

export default function gameModeListeners() {

  phraseCheckBox.addEventListener(('change'), (evt) => {
    wordCheckBox.checked = !wordCheckBox.checked;
    state.isPhrase = phraseCheckBox.checked;
    fetchDataAndStart();
  });

  wordCheckBox.addEventListener(('change'), (evt) => {
    phraseCheckBox.checked = !phraseCheckBox.checked;
    state.isPhrase = phraseCheckBox.checked;
    fetchDataAndStart();
  });
}

gameModeListeners();