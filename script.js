// mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // closes the menu after a nav link is clicked (mobile)
    primaryNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            primaryNav.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}