import './style.scss';
import '@melloware/coloris/dist/coloris.css';
import Coloris from '@melloware/coloris';
import {
  STORAGE_KEYS,
  bgColorInput,
  fontColorInput,
  fontStyleSelect,
  imageSrcSelect,
  textAreaInput,
  noteBtn,
  getNoteBtn,
  clearStorageButton,
  emptyStorageButton,
} from './constants.js';
import { withHash } from './modules/withHash.js'
import { localStorageSupport } from './modules/localStorageSupport.js'
import { clearStorage } from './modules/clearStorage.js'
import { emptyStorage } from './modules/emptyStorage.js'
import { populateStorage } from './modules/populateStorage.js'
import { setStyles } from './modules/setStyles.js'
import { restoreNote } from './modules/restoreNote.js'
import { renderFooter } from './modules/renderFooter.js'


// ---- Coloris setup ----
Coloris.init();
Coloris({
  el: '.coloris',
  theme: 'large',
  themeMode: 'light',
  format: 'hex',
});

// ---- Init ----
const hasSavedSelections =
  localStorage.getItem(STORAGE_KEYS.bgColor) &&
  localStorage.getItem(STORAGE_KEYS.fontFamily) &&
  localStorage.getItem(STORAGE_KEYS.image) &&
  localStorage.getItem(STORAGE_KEYS.fontColor);

if (hasSavedSelections) {
  setStyles();
} else {
  populateStorage();
}

restoreNote();
renderFooter();

// ---- Event listeners ----
noteBtn.addEventListener('click', () => {
  localStorage.setItem(STORAGE_KEYS.note, textAreaInput.value);
});

getNoteBtn.addEventListener('click', () => {
  textAreaInput.value = localStorage.getItem(STORAGE_KEYS.note) ?? '';
});

clearStorageButton.addEventListener('click', (event) => {
  event.preventDefault();
  clearStorage();
});

emptyStorageButton.addEventListener('click', (event) => {
  event.preventDefault();
  emptyStorage();
});

bgColorInput.addEventListener('change', populateStorage);
fontColorInput.addEventListener('change', populateStorage);
fontStyleSelect.addEventListener('change', populateStorage);
imageSrcSelect.addEventListener('change', populateStorage);
textAreaInput.addEventListener('change', populateStorage);
