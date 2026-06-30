import { STORAGE_KEYS, textAreaInput } from '../constants.js';
/** Restores the saved note text into the textarea, if one exists. */
export function restoreNote() {
    const savedNote = localStorage.getItem(STORAGE_KEYS.note);
    if (savedNote) {
        textAreaInput.value = savedNote;
    }
}
