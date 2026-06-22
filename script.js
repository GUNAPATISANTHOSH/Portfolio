/* ============================================================
   SANTHOSH REDDY PORTFOLIO — Interactions
   ============================================================ */

// ── SCROLL PROGRESS ──────────────────────────────────────────
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.style.width = ((window.scrollY / total) * 100) + '%';
}, { passive: true });

// ── CURSOR GLOW (desktop only) ───────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', e => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top  = e.clientY + 'px';
    });
} else {
    cursorGlow.style.display = 'none';
}

// ── NAVBAR ───────────────────────────────────────────────────
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

let lastScroll = 0;
window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    navbar.classList.toggle('scrolled', current > 60);
    // Hide on scroll down, show on scroll up
    if (current > lastScroll && current > 400) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = current;
}, { passive: true });

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
    });
});

// ── ACTIVE NAV LINK ──────────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top    = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const id     = section.getAttribute('id');
        if (scrollY >= top && scrollY < bottom) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ── SMOOTH SCROLL WITH OFFSET ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
});

// ── SCROLL REVEAL ────────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── 3D CARD TILT ─────────────────────────────────────────────
document.querySelectorAll('.skill-card, .project-card, .stat-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
        const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
        this.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ── TYPING EFFECT ────────────────────────────────────────────
function typeWriter(el, words, speed = 100, pause = 2000) {
    let wIdx = 0, cIdx = 0, deleting = false;
    function tick() {
        const current = words[wIdx];
        el.textContent = current.substring(0, cIdx);
        if (!deleting && cIdx === current.length) {
            setTimeout(() => { deleting = true; tick(); }, pause);
            return;
        }
        if (deleting && cIdx === 0) {
            deleting = false;
            wIdx = (wIdx + 1) % words.length;
        }
        cIdx += deleting ? -1 : 1;
        setTimeout(tick, deleting ? speed / 2 : speed);
    }
    tick();
}

const typedEl = document.getElementById('typedRole');
if (typedEl) {
    typeWriter(typedEl, [
        'Full Stack Developer',
        'CS Final Year Student',
        'Backend Enthusiast',
        'Problem Solver',
    ], 90, 2200);
}

// ── RIPPLE ON BUTTONS ────────────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const r = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        r.style.cssText = `
            position:absolute; pointer-events:none;
            width:${size}px; height:${size}px; border-radius:50%;
            background:rgba(255,255,255,.25);
            left:${e.clientX - rect.left - size/2}px;
            top:${e.clientY - rect.top - size/2}px;
            transform:scale(0); animation:btnRipple .6s ease-out forwards;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(r);
        r.addEventListener('animationend', () => r.remove());
    });
});

const rippleCSS = document.createElement('style');
rippleCSS.textContent = `@keyframes btnRipple { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(rippleCSS);

// ── TIMELINE STAGGER ─────────────────────────────────────────
const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 120);
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item').forEach(item => {
    item.classList.add('reveal');
    timelineObserver.observe(item);
});

// ── PAGE LOAD FADE ───────────────────────────────────────────
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity .4s ease';
        document.body.style.opacity = '1';
    });
});

// ── CONSOLE EGG ──────────────────────────────────────────────
console.log('%c✦ Santhosh Reddy · Portfolio', 'color:#4F8EF7; font-size:18px; font-weight:700;');
console.log('%c→ github.com/GUNAPATISANTHOSH', 'color:#a78bfa; font-size:13px;');
console.log('%c→ santoshsantutej@gmail.com',   'color:#34d399; font-size:13px;');