/** Normalize a hex color string to always include a leading '#'. */
export function withHash(hex) {
    return hex.startsWith('#') ? hex : `#${hex}`;
}