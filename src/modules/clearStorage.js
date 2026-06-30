import { STORAGE_KEYS, textAreaInput } from '../constants.js';
/** Clears only the saved note, both from the textarea and from storage. */
export function clearStorage() {
    textAreaInput.value = '';
    localStorage.removeItem(STORAGE_KEYS.note);
}