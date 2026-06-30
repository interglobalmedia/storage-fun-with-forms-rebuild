import { textAreaInput } from '../constants.js';
/** Empties all app data from localStorage and resets the note field. */
export function emptyStorage() {
    textAreaInput.value = '';
    localStorage.clear();
}