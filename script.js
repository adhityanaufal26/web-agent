/* ========================================
   OPAL — Landing Page Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // === NAVBAR SCROLL EFFECT ===
    const navbar = document.getElementById('navbar');

    const handleNavbarScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // === MOBILE NAVIGATION ===
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // === SCROLL ANIMATIONS (Intersection Observer) ===
    const animatedElements = document.querySelectorAll('[data-animate]');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    });

    animatedElements.forEach(el => animationObserver.observe(el));

    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 24;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // === TERMINAL TYPING REVEAL ===
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        const terminalLines = terminalBody.querySelectorAll('.terminal-line');

        const terminalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                terminalLines.forEach((line, index) => {
                    line.style.opacity = '0';
                    line.style.transform = 'translateY(6px)';
                    line.style.transition = 'opacity 0.45s ease, transform 0.45s ease';

                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.transform = 'translateY(0)';
                    }, index * 260);
                });
                terminalObserver.unobserve(entry.target);
            });
        }, { threshold: 0.3 });

        terminalObserver.observe(terminalBody);
    }

    // === ACTIVE NAV LINK HIGHLIGHTING ===
    const sections = document.querySelectorAll('section[id]');

    const highlightNavLink = () => {
        const scrollY = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (!navLink) return;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLink.style.color = 'var(--text-primary)';
            } else {
                navLink.style.color = '';
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink, { passive: true });

    // === FLOATING WA SHOW/HIDE ON SCROLL ===
    const floatingWa = document.getElementById('floating-whatsapp');
    if (floatingWa) {
        floatingWa.style.opacity = '0';
        floatingWa.style.transform = 'scale(0.85)';
        floatingWa.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s ease';

        const showWa = () => {
            if (window.scrollY > 400) {
                floatingWa.style.opacity = '1';
                floatingWa.style.transform = 'scale(1)';
            } else {
                floatingWa.style.opacity = '0';
                floatingWa.style.transform = 'scale(0.85)';
            }
        };

        window.addEventListener('scroll', showWa, { passive: true });
        showWa();
    }

    // === BUTTON CURSOR GLOW ===
    // tracks mouse position inside each button so the radial highlight follows
    // the cursor. replaces the previous full-viewport parallax which felt gimmicky.
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            btn.style.setProperty('--mx', `${x}%`);
            btn.style.setProperty('--my', `${y}%`);
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.setProperty('--mx', `50%`);
            btn.style.setProperty('--my', `50%`);
        });
    });
});
