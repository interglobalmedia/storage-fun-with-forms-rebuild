// ---- Element references ----
export const htmlElem = document.querySelector('html');
export const pElem = document.querySelector('p.font-color');
export const fontStyleElem = document.querySelector('.font-style');
export const imageElem = document.querySelector('img.image');

export const bgColorInput = document.querySelector('#bgcolor');
export const fontColorInput = document.querySelector('#fontcolor');
export const fontStyleSelect = document.querySelector('#font');
export const imageSrcSelect = document.querySelector('#image');
export const textAreaInput = document.querySelector('#textArea');

export const noteBtn = document.querySelector('#note-btn');
export const getNoteBtn = document.querySelector('#get-note-btn');
export const clearStorageButton = document.querySelector('.clear');
export const emptyStorageButton = document.querySelector('.empty');
export const storageQuotaMsg = document.getElementById('storage-quota-msg');

// ---- Storage keys ----
export const STORAGE_KEYS = {
    bgColor: 'bgcolor',
    fontColor: 'fontcolor',
    fontFamily: 'fontfamily',
    image: 'image',
    note: 'note',
};