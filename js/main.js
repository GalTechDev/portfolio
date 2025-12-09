/**
 * Portfolio - Main Scripts
 * Animations et effets généraux
 */

/**
 * Anime les éléments de la timeline au scroll
 */
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Fallback: forcer la visibilité après 2 secondes si l'observer ne fonctionne pas
    const fallbackTimeout = setTimeout(() => {
        timelineItems.forEach(item => {
            if (!item.classList.contains('visible')) {
                item.classList.add('visible');
            }
        });
    }, 2000);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px'
    });

    timelineItems.forEach(item => observer.observe(item));

    // Vérifier immédiatement les éléments déjà visibles
    setTimeout(() => {
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                item.classList.add('visible');
            }
        });
    }, 300);
}

/**
 * Anime les cartes de projet au scroll
 */
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    projectCards.forEach(card => observer.observe(card));
}

/**
 * Navigation smooth scroll
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Effet parallax léger sur le hero
 */
function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    });
}

/**
 * Navigation sticky avec effet
 */
function initNavEffect() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 15, 0.95)';
            nav.style.borderBottomColor = 'rgba(0, 212, 255, 0.1)';
        } else {
            nav.style.background = 'rgba(10, 10, 15, 0.9)';
            nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
        }
    });
}

/**
 * Initialisation générale
 */
document.addEventListener('DOMContentLoaded', () => {
    // Petit délai pour laisser le DOM se charger
    setTimeout(() => {
        initTimelineAnimations();
        initProjectAnimations();
    }, 100);

    initSmoothScroll();
    initHeroParallax();
    initNavEffect();
});
