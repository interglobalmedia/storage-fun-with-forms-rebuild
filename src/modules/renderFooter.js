/** Updates the footer's copyright year and author credit. */
export function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    const year = new Date().getFullYear();
    footer.innerHTML = `&#10013; &copy; ${year} Maria D. Campbell &#10013;`;
    return footer.innerHTML;
}