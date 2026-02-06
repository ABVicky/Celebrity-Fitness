/**
 * CELEBRITY FITNESS - UI/UX OPTIMIZATION ENGINE
 */

// 1. Scroll Intelligence (Progress & Back-to-Top)
const scrollProgress = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;

    // Update Progress Bar
    if (scrollProgress) scrollProgress.style.width = `${progress}%`;

    // Toggle Back-to-Top
    if (backToTop) {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    }
}, { passive: true });

// Active Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, { passive: true });

// Parallax Effect for Floating Shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
}, { passive: true });

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 2. Elite Mobile Navigation
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

const toggleMenu = (forceState = null) => {
    const currentState = mobileMenu.classList.contains('active');
    const newState = forceState !== null ? forceState : !currentState;

    mobileMenu.classList.toggle('active', newState);
    mobileToggle.classList.toggle('is-active', newState);
    document.body.style.overflow = newState ? 'hidden' : '';
    mobileToggle.setAttribute('aria-expanded', newState);

    // Animate individual links
    if (newState) {
        mobileMenu.querySelectorAll('li').forEach((li, i) => {
            li.style.transitionDelay = `${0.1 + (i * 0.08)}s`;
        });
    }
};

mobileToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu on link click or clicking outside
mobileMenu?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target === mobileMenu) {
        toggleMenu(false);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
});

// 3. Precise Header State
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// 4. Advanced Reveal Engine
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 5. High-Performance Carousels
const setupAutoSlider = (trackId, interval = 5000) => {
    const track = document.getElementById(trackId);
    if (!track) return;

    let items = Array.from(track.children);
    let index = 0;

    const slide = () => {
        index = (index + 1) % items.length;
        const itemWidth = items[0].offsetWidth + 24;
        track.style.transform = `translateX(-${index * itemWidth}px)`;
    };

    let timer = setInterval(slide, interval);
    track.parentElement.addEventListener('mouseenter', () => clearInterval(timer));
    track.parentElement.addEventListener('mouseleave', () => timer = setInterval(slide, interval));
};

setupAutoSlider('gallery-track', 4000);

// 6. Magnetic Interactions 2.0
const setupMagnetic = () => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.querySelectorAll('.btn-magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
};
setupMagnetic();

// 7. Professional Form Validation
const startupForm = document.getElementById('startup-form');
const validateInput = (input) => {
    const isValid = input.checkValidity();
    input.classList.toggle('valid', isValid && input.value !== '');
    input.classList.toggle('invalid', !isValid && input.value !== '');
    return isValid;
};

startupForm?.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => validateInput(input));
});

startupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = startupForm.querySelectorAll('input');
    let isAllValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) isAllValid = false;
    });

    if (isAllValid) {
        const btn = startupForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'TRANSMITTING...';
        btn.disabled = true;

        setTimeout(() => {
            alert('DATA ENCRYPTED & SYNCED. WELCOME TO THE ELITE.');
            btn.innerText = originalText;
            btn.disabled = false;
            startupForm.reset();
            inputs.forEach(i => i.classList.remove('valid', 'invalid'));
        }, 1500);
    }
});

// 8. Smooth Navigation Logic
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// 9. Extraordinary Mouse Trail Effect
let particles = [];
const particleCount = 15;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.02;
        this.size *= 0.95;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(255, 0, 64, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener('mousemove', (e) => {
    if (particles.length < particleCount) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
        p.update();
        p.draw(ctx);
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();


