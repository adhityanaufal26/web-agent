/* ========================================
   OPAL — Landing Page Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // === NAVBAR SCROLL EFFECT ===
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    const handleNavbarScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // === MOBILE NAVIGATION ===
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close mobile nav on link click
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

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

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
    }, observerOptions);

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // === COUNTER ANIMATION ===
    const counterElements = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                const duration = 2000;
                const startTime = performance.now();

                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const currentCount = Math.floor(eased * countTo);

                    target.textContent = currentCount;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = countTo;
                    }
                };

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => {
        counterObserver.observe(el);
    });

    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === TERMINAL TYPING ANIMATION ===
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        const terminalLines = terminalBody.querySelectorAll('.terminal-line');

        const terminalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    terminalLines.forEach((line, index) => {
                        line.style.opacity = '0';
                        line.style.transform = 'translateY(10px)';
                        line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

                        setTimeout(() => {
                            line.style.opacity = '1';
                            line.style.transform = 'translateY(0)';
                        }, index * 300);
                    });
                    terminalObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        terminalObserver.observe(terminalBody);
    }

    // === ACTIVE NAV LINK HIGHLIGHTING ===
    const sections = document.querySelectorAll('section[id]');

    const highlightNavLink = () => {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.style.color = 'var(--text-primary)';
                    navLink.style.setProperty('--after-width', '100%');
                } else {
                    navLink.style.color = '';
                    navLink.style.setProperty('--after-width', '0');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink, { passive: true });

    // === FLOATING WA SHOW/HIDE ON SCROLL ===
    const floatingWa = document.getElementById('floating-whatsapp');
    if (floatingWa) {
        floatingWa.style.opacity = '0';
        floatingWa.style.transform = 'scale(0.8)';
        floatingWa.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s ease';

        const showWa = () => {
            if (window.scrollY > 400) {
                floatingWa.style.opacity = '1';
                floatingWa.style.transform = 'scale(1)';
            } else {
                floatingWa.style.opacity = '0';
                floatingWa.style.transform = 'scale(0.8)';
            }
        };

        window.addEventListener('scroll', showWa, { passive: true });
        showWa();
    }

    // === PARALLAX GLOW EFFECT ===
    const heroGlows = document.querySelectorAll('.hero-glow');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        heroGlows.forEach((glow, index) => {
            const factor = index === 0 ? 1 : -1;
            glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    }, { passive: true });
});
