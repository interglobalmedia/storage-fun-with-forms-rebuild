import {
    STORAGE_KEYS,
    bgColorInput,
    fontStyleSelect,
    imageSrcSelect,
    fontColorInput,
    textAreaInput,
    storageQuotaMsg,
} from '../constants.js';
import { localStorageSupport } from './localStorageSupport.js';
import { setStyles } from './setStyles.js';
/**
 * Writes all current form selections to localStorage, then applies them.
 * Guards against quota errors the way the original did, but actually
 * inspects the thrown error rather than constructing a fresh, blank one.
 */
export function populateStorage() {
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