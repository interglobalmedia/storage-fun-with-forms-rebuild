import './style.scss';
import '@melloware/coloris/dist/coloris.css';
import Coloris from '@melloware/coloris';

// ---- Storage keys ----
const STORAGE_KEYS = {
  bgColor: 'bgcolor',
  fontColor: 'fontcolor',
  fontFamily: 'fontfamily',
  image: 'image',
  note: 'note',
};

// ---- Element references ----
const htmlElem = document.querySelector('html');
const pElem = document.querySelector('p.font-color');
const fontStyleElem = document.querySelector('.font-style');
const imageElem = document.querySelector('img.image');

const bgColorInput = document.querySelector('#bgcolor');
const fontColorInput = document.querySelector('#fontcolor');
const fontStyleSelect = document.querySelector('#font');
const imageSrcSelect = document.querySelector('#image');
const textAreaInput = document.querySelector('#textArea');

const noteBtn = document.querySelector('#note-btn');
const getNoteBtn = document.querySelector('#get-note-btn');
const clearStorageButton = document.querySelector('.clear');
const emptyStorageButton = document.querySelector('.empty');
const storageQuotaMsg = document.getElementById('storage-quota-msg');

// ---- Coloris setup ----
Coloris.init();
Coloris({
  el: '.coloris',
  theme: 'large',
  themeMode: 'light',
  format: 'hex',
});

/** Normalize a hex color string to always include a leading '#'. */
function withHash(hex) {
  return hex.startsWith('#') ? hex : `#${hex}`;
}

/** Detects basic Web Storage API support. */
function localStorageSupport() {
  return typeof Storage !== 'undefined';
}

/** Clears only the saved note, both from the textarea and from storage. */
function clearStorage() {
  textAreaInput.value = '';
  localStorage.removeItem(STORAGE_KEYS.note);
}

/** Empties all app data from localStorage and resets the note field. */
function emptyStorage() {
  textAreaInput.value = '';
  localStorage.clear();
}

/**
 * Writes all current form selections to localStorage, then applies them.
 * Guards against quota errors the way the original did, but actually
 * inspects the thrown error rather than constructing a fresh, blank one.
 */
function populateStorage() {
  if (!localStorageSupport()) {
    storageQuotaMsg.textContent = 'Sorry. No HTML5 local storage support here.';
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEYS.bgColor, bgColorInput.value);
    localStorage.setItem(STORAGE_KEYS.fontFamily, fontStyleSelect.value);
    localStorage.setItem(STORAGE_KEYS.image, imageSrcSelect.value);
    localStorage.setItem(STORAGE_KEYS.fontColor, fontColorInput.value);
    localStorage.setItem(STORAGE_KEYS.note, textAreaInput.value);
    setStyles();
  } catch (error) {
    if (
      error instanceof DOMException &&
      (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    ) {
      storageQuotaMsg.textContent = 'Local Storage Quota Exceeded!';
    } else {
      throw error;
    }
  }
}

/** Reads saved selections from localStorage and applies them to the form and page. */
function setStyles() {
  const currentBgColor = localStorage.getItem(STORAGE_KEYS.bgColor);
  const currentFont = localStorage.getItem(STORAGE_KEYS.fontFamily);
  const currentImage = localStorage.getItem(STORAGE_KEYS.image);
  const currentFontColor = localStorage.getItem(STORAGE_KEYS.fontColor);

  if (currentBgColor) {
    bgColorInput.value = currentBgColor;
    htmlElem.style.backgroundColor = withHash(currentBgColor);
  }
  if (currentFont) {
    fontStyleSelect.value = currentFont;
    pElem.style.fontFamily = currentFont;
  }
  if (currentImage) {
    imageSrcSelect.value = currentImage;
    imageElem.setAttribute('src', currentImage);
  }
  if (currentFontColor) {
    fontColorInput.value = currentFontColor;
    fontStyleElem.style.color = withHash(currentFontColor);
  }
}

/** Restores the saved note text into the textarea, if one exists. */
function restoreNote() {
  const savedNote = localStorage.getItem(STORAGE_KEYS.note);
  if (savedNote) {
    textAreaInput.value = savedNote;
  }
}

/** Updates the footer's copyright year and author credit. */
function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  const year = new Date().getFullYear();
  footer.innerHTML = `&#10013; &copy; ${year} Maria D. Campbell &#10013;`;
}

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
