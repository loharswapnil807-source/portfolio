/* ── main.js — Swapnil Lohar Portfolio ───────────────────── */
'use strict';

/* ── Scroll reveal ────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('[data-rv]');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // stagger siblings in the same parent
          const siblings = entry.target.parentElement.querySelectorAll('[data-rv]');
          let delay = 0;
          siblings.forEach((sib) => {
            if (sib === entry.target) {
              sib.style.transitionDelay = delay + 'ms';
              sib.classList.add('rv-in');
            }
          });
          entry.target.classList.add('rv-in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => io.observe(el));
})();

/* ── Sticky nav ───────────────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const links = document.getElementById('navlinks');
  if (!nav) return;

  // Sticky on scroll
  const onScroll = () => {
    nav.classList.toggle('stuck', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.classList.toggle('active', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && links.classList.contains('open')) {
        links.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
})();

/* ── Active nav link on scroll ────────────────────────────── */
(function initActiveLink() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const links = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('on'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('on');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => io.observe(s));
})();

/* ── Hero title entrance ──────────────────────────────────── */
(function initHeroEntrance() {
  const lines = document.querySelectorAll('.hero-title .line span');
  if (!lines.length) return;

  lines.forEach((span, i) => {
    span.style.transform = 'translateY(110%)';
    span.style.display = 'block';
    span.style.transition = `transform 1s cubic-bezier(.16,1,.3,1) ${i * 120 + 100}ms`;
  });

  // Trigger after a tiny paint frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      lines.forEach((span) => {
        span.style.transform = 'none';
      });
    });
  });
})();

/* ── Project card subtle tilt on hover ────────────────────── */
(function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-3px) rotateY(${x * 4}deg) rotateX(${-y * 3}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
