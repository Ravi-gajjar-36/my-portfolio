document.addEventListener('DOMContentLoaded', () => {
    
    // --- SCROLL ANIMATION (The "consecutive pictures shows appearance" effect) ---
    const faders = document.querySelectorAll('.fade-in, .fade-in-up');

    const appearOptions = {
        threshold: 0, // Element appears as soon as 0% of it is visible
        rootMargin: "0px 0px -100px 0px" // Start loading 100px before reaching the bottom
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add 'visible' class to trigger CSS transition
                entry.target.classList.add('visible');
                // Stop observing this element once it's visible
                appearOnScroll.unobserve(entry.target);
            }
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
            // Check if the scroll position is past the top of the section
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        // Loop through all nav links and set the 'active' class
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
    });
});