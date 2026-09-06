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


// ---- manual dark/light theme toggle ----
// Falls back to the OS-level `prefers-color-scheme` (handled in CSS)
// until the visitor picks explicitly; the choice then persists via
// localStorage across visits.
const themeToggle = document.getElementById('themeToggle');
const rootEl = document.documentElement;
const storedTheme = localStorage.getItem('theme');

if (storedTheme === 'dark' || storedTheme === 'light') {
    rootEl.setAttribute('data-theme', storedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const current = rootEl.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
        const next = current === 'dark' ? 'light' : 'dark';

        rootEl.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}


// ---- scroll progress bar ----
const progressBar = document.getElementById('scrollProgress');

if (progressBar) {
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = percent + '%';
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
}


// ---- scroll-triggered reveal animation ----
// Elements marked `.reveal` fade/slide in the first time they enter
// the viewport. `.reveal-init` is added by JS (not present in the
// base CSS) so that if this script fails to load, content is never
// stuck invisible.
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
    revealEls.forEach((el) => el.classList.add('reveal-init'));

    // stagger items that share a common list/section wrapper
    document.querySelectorAll('.project-list, .gallery-section').forEach((group) => {
        const items = group.querySelectorAll(':scope > .reveal');
        items.forEach((item, i) => {
            item.style.setProperty('--reveal-delay', `${Math.min(i * 0.08, 0.4)}s`);
        });
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach((el) => observer.observe(el));
    } else {
        // no IntersectionObserver support — just show everything
        revealEls.forEach((el) => el.classList.add('is-visible'));
    }
}