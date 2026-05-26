/**
 * OUTZAAR — interactive landing page
 * Liquid metal shader, custom cursor, scroll-driven effects
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
const isLowPerformance = detectLowPerformance();

if (isLowPerformance) document.body.classList.add('low-performance');
if (prefersReducedMotion) document.body.classList.add('reduced-motion');

const state = {
  mouseX: window.innerWidth / 2,
  mouseY: window.innerHeight / 2,
  targetOffsetX: 0,
  targetOffsetY: 0,
  currentOffsetX: 0,
  currentOffsetY: 0,
  cursorX: window.innerWidth / 2,
  cursorY: window.innerHeight / 2,
  ringX: window.innerWidth / 2,
  ringY: window.innerHeight / 2,
  isHovering: false,
  scrollProgress: 0,
  shaderMount: null,
  baseDistortion: 0.12,
};

function detectLowPerformance() {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return cores <= 4 || memory <= 4 || isMobile;
}

// ── Loader ──────────────────────────────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('page-loader');
  const fill = document.getElementById('loader-fill');
  if (!loader || !fill) return;

  let progress = 0;
  const tick = setInterval(() => {
    progress = Math.min(progress + Math.random() * 18 + 8, 92);
    fill.style.width = `${progress}%`;
  }, 120);

  return {
    complete() {
      clearInterval(tick);
      fill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        loader.setAttribute('aria-hidden', 'true');
      }, 400);
    },
  };
}

// ── Hero particles & streaks ───────────────────────────────────────────────
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || prefersReducedMotion) return;

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    const dx = (Math.random() - 0.5) * 100;
    p.style.cssText = `
      left:${left}%;
      bottom:0;
      width:${size}px;
      height:${size}px;
      background:rgba(99,102,241,${Math.random() * 0.4 + 0.1});
      animation-duration:${duration}s;
      animation-delay:${delay}s;
      --dx:${dx}px;
    `;
    canvas.appendChild(p);
  }

  for (let i = 0; i < 6; i++) {
    const s = document.createElement('div');
    s.className = 'streak';
    s.style.cssText = `
      top:${10 + i * 14}%;
      width:${200 + Math.random() * 300}px;
      left:${Math.random() * 60}%;
      animation-delay:${i * 1.2}s;
    `;
    canvas.appendChild(s);
  }
}

// ── Liquid metal shader ─────────────────────────────────────────────────────
async function initLiquidMetal() {
  const host = document.getElementById('liquid-metal-host');
  if (!host || prefersReducedMotion) {
    document.body.classList.add('no-shader');
    return null;
  }

  try {
    const {
      ShaderMount,
      liquidMetalFragmentShader,
      LiquidMetalShapes,
      ShaderFitOptions,
    } = await import('https://esm.sh/@paper-design/shaders@0.0.46');

    const speed = isLowPerformance ? 0.5 : 1;
    const maxPixelCount = isLowPerformance ? 1920 * 1080 : 1920 * 1080 * 2;

    const mount = new ShaderMount(
      host,
      liquidMetalFragmentShader,
      {
        u_isImage: false,
        u_shape: LiquidMetalShapes.metaballs,
        u_colorBack: [0.03, 0.04, 0.09, 1],
        u_colorTint: [0.39, 0.4, 0.95, 1],
        u_repetition: 2,
        u_shiftRed: 0.35,
        u_shiftBlue: 0.35,
        u_softness: 0.12,
        u_distortion: state.baseDistortion,
        u_contour: 0.45,
        u_angle: 70,
        u_scale: 1.4,
        u_fit: ShaderFitOptions.cover,
        u_offsetX: 0,
        u_offsetY: 0,
        u_originX: 0.5,
        u_originY: 0.5,
        u_worldWidth: 0,
        u_worldHeight: 0,
      },
      undefined,
      speed,
      0,
      isLowPerformance ? 1 : 2,
      maxPixelCount
    );

    state.shaderMount = mount;
    return mount;
  } catch (err) {
    console.warn('Liquid metal shader unavailable:', err);
    document.body.classList.add('no-shader');
    return null;
  }
}

// ── Scroll fade & shader intensity ──────────────────────────────────────────
function initScrollEffects() {
  const overlay = document.getElementById('liquid-overlay');
  const hero = document.getElementById('hero');
  const heroContent = document.querySelector('.hero-content');
  const navbar = document.getElementById('navbar');
  const host = document.getElementById('liquid-metal-host');

  function onScroll() {
    const heroHeight = hero?.offsetHeight || window.innerHeight;
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / heroHeight, 1);
    state.scrollProgress = progress;

    if (overlay) {
      overlay.style.opacity = String(Math.min(progress * 0.92, 0.92));
    }

    if (host) {
      host.style.opacity = String(1 - progress * 0.55);
    }

    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 40);
    }

    if (heroContent && !prefersReducedMotion) {
      heroContent.style.transform = `translateY(${scrollY * 0.12}px)`;
    }

    if (state.shaderMount) {
      const speed = Math.max(0.2, 1 - progress * 0.75);
      state.shaderMount.setSpeed(isLowPerformance ? speed * 0.5 : speed);

      const distortion = state.baseDistortion * (1 - progress * 0.4);
      state.shaderMount.setUniforms({ u_distortion: distortion });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Custom cursor ───────────────────────────────────────────────────────────
function initCursor() {
  if (isCoarsePointer || prefersReducedMotion) return;

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  document.body.classList.add('custom-cursor-active');
  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');

  document.addEventListener('mousemove', (e) => {
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
    state.targetOffsetX = (e.clientX / window.innerWidth - 0.5) * 0.35;
    state.targetOffsetY = (e.clientY / window.innerHeight - 0.5) * 0.35;
    cursor.classList.add('visible');
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
  });

  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

  const hoverTargets = document.querySelectorAll('[data-cursor]');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      state.isHovering = true;
      cursor.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      state.isHovering = false;
      cursor.classList.remove('hovering');
    });
  });
}

function animateCursorAndShader() {
  const cursor = document.getElementById('custom-cursor');
  const lerp = state.isHovering ? 0.18 : 0.14;
  const shaderLerp = 0.1;

  state.cursorX = state.mouseX;
  state.cursorY = state.mouseY;
  state.ringX += (state.mouseX - state.ringX) * lerp;
  state.ringY += (state.mouseY - state.ringY) * lerp;
  state.currentOffsetX += (state.targetOffsetX - state.currentOffsetX) * shaderLerp;
  state.currentOffsetY += (state.targetOffsetY - state.currentOffsetY) * shaderLerp;

  if (cursor) {
    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');
    if (dot) {
      dot.style.transform = `translate(${state.cursorX}px, ${state.cursorY}px)`;
    }
    if (ring) {
      ring.style.transform = `translate(${state.ringX}px, ${state.ringY}px)`;
    }
  }

  if (state.shaderMount && !prefersReducedMotion) {
    state.shaderMount.setUniforms({
      u_offsetX: state.currentOffsetX,
      u_offsetY: -state.currentOffsetY,
    });
  }

  requestAnimationFrame(animateCursorAndShader);
}

// ── Magnetic buttons ──────────────────────────────────────────────────────────
function initMagnetic() {
  if (isCoarsePointer) return;

  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ── Card tilt ─────────────────────────────────────────────────────────────────
function initTiltCards() {
  if (prefersReducedMotion || isCoarsePointer) return;

  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── Pipeline auto-cycle ───────────────────────────────────────────────────────
function initPipeline() {
  const steps = document.querySelectorAll('.pipe-step');
  if (!steps.length) return;

  let active = 0;

  function setActive(index) {
    steps.forEach((s, i) => s.classList.toggle('active', i === index));
    active = index;
  }

  steps.forEach((step) => {
    step.addEventListener('click', () => {
      setActive(Number(step.dataset.step));
    });
  });

  if (!prefersReducedMotion) {
    setInterval(() => {
      setActive((active + 1) % steps.length);
    }, 2200);
  }
}

// ── FAQ accordion ─────────────────────────────────────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    const icon = item.querySelector('.faq-icon');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a')?.classList.remove('open');
          resetFaqIcon(other.querySelector('.faq-icon'));
        }
      });

      item.classList.toggle('open', !isOpen);
      answer.classList.toggle('open', !isOpen);
      updateFaqIcon(icon, !isOpen);
    });
  });
}

function updateFaqIcon(icon, open) {
  if (!icon) return;
  icon.innerHTML = open
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';
}

function resetFaqIcon(icon) {
  if (!icon) return;
  icon.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';
}

// ── Reveal on scroll ──────────────────────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => obs.observe(el));
}

// ── Smooth scroll for anchor links ────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
}

// ── Boot ──────────────────────────────────────────────────────────────────────
async function boot() {
  const loader = initLoader();
  initHeroCanvas();
  initScrollEffects();
  initCursor();
  initMagnetic();
  initTiltCards();
  initPipeline();
  initFAQ();
  initReveal();
  initSmoothScroll();

  requestAnimationFrame(animateCursorAndShader);

  const shaderPromise = initLiquidMetal();
  await Promise.race([
    shaderPromise,
    new Promise((r) => setTimeout(r, 2500)),
  ]);

  loader?.complete();
}

boot();
