import { bgColorInput, htmlElem, pElem, imageElem, fontStyleElem, fontStyleSelect, imageSrcSelect, fontColorInput, STORAGE_KEYS } from '../constants.js'
import { withHash } from './withHash.js'
/** Reads saved selections from localStorage and applies them to the form and page. */
export function setStyles() {
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