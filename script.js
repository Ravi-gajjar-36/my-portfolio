document.addEventListener('DOMContentLoaded', () => {
    // --- SCROLL ANIMATION (The "consecutive pictures shows appearance" effect) ---
    const faders = document.querySelectorAll('.fade-in, .fade-in-up');

    const appearOptions = {
        threshold: 0, // Element appears as soon as 0% of it is visible
        rootMargin: "0px 0px -100px 0px" // Start loading 100px before reaching the bottom
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // Add 'visible' class to trigger CSS transition
            entry.target.classList.add('visible');
            // Stop observing this element once it's visible
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        // Set the delay attribute for staggered loading (e.g., for the skill cards)
        const delay = fader.getAttribute('data-delay') || 0;
        fader.style.setProperty('--delay', delay);
        appearOnScroll.observe(fader);
    });

    // --- ACTIVE NAVIGATION HIGHLIGHT ---
    const sections = document.querySelectorAll('.content-section, #home');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
    });

    // --- INITIALIZE ACCORDION DEFAULT OPEN STATE ---
    const openContents = document.querySelectorAll('.accordion-content.open');
    openContents.forEach(content => {
        content.style.maxHeight = content.scrollHeight + 'px';
    });
});

// --- ACCORDION TOGGLE (About section) ---
function toggleAccordion(header) {
    const item = header.parentElement;
    const content = item.querySelector('.accordion-content');
    const isOpen = content.classList.contains('open');

    const allItems = document.querySelectorAll('.accordion-item');

    // Close all
    allItems.forEach(i => {
        const c = i.querySelector('.accordion-content');
        const h = i.querySelector('.accordion-header');
        const icon = h.querySelector('.toggle-icon');

        c.classList.remove('open');
        c.style.maxHeight = null;
        h.classList.remove('active');
        if (icon) icon.classList.remove('open');
    });

    // Open clicked if it was closed
    if (!isOpen) {
        content.classList.add('open');
        header.classList.add('active');
        const icon = header.querySelector('.toggle-icon');
        if (icon) icon.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
}
