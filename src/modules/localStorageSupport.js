/** Detects basic Web Storage API support. */
export function localStorageSupport() {
    return typeof Storage !== 'undefined';
}