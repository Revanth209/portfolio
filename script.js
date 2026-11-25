const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover)').matches;

$('#year').textContent = new Date().getFullYear();

const themeBtn = $('#theme-toggle');
function setTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  themeBtn.textContent = mode === 'dark' ? '☀️' : '🌙';
  try { localStorage.setItem('theme', mode); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.addEventListener('click', () => {
  setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

const menu = $('#nav-menu');
const menuBtn = $('#menu-toggle');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.textContent = open ? '✕' : '☰';
});
$$('#nav-menu a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  menuBtn.textContent = '☰';
}));

const roles = ['Accountant', 'Tally Prime Professional', 'GST Compliance Associate', 'Bank Reconciliation Professional', 'Web Page Creator'];
const typingEl = $('#typing');
let ri = 0, ci = 0, deleting = false;
function type() {
  const word = roles[ri];
  typingEl.textContent = word.slice(0, ci);
  if (!deleting && ci < word.length) { ci++; setTimeout(type, 85); }
  else if (!deleting) { deleting = true; setTimeout(type, 1500); }
  else if (ci > 0) { ci--; setTimeout(type, 40); }
  else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 320); }
}
type();

const mega = $('.mega');
if (mega) {
  mega.setAttribute('aria-label', mega.textContent.replace(/\s+/g, ' ').trim());
  mega.classList.remove('reveal');
  let n = 0;
  $$(':scope > span', mega).forEach(line => {
    const text = line.textContent;
    line.textContent = '';
    line.classList.add('line');
    line.setAttribute('aria-hidden', 'true');
    [...text].forEach(chr => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.textContent = chr === ' ' ? ' ' : chr;
      s.style.setProperty('--i', n++);
      line.appendChild(s);
    });
  });
}

const splitTargets = $$('h2.big, h2.mega-sm');
function splitWords(h) {
  let i = 0;
  const walk = node => {
    [...node.childNodes].forEach(nd => {
      if (nd.nodeType === 3) {
        const frag = document.createDocumentFragment();
        nd.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const wi = document.createElement('span'); wi.className = 'wi';
          wi.textContent = part; wi.style.setProperty('--i', i++);
          w.appendChild(wi); frag.appendChild(w);
        });
        nd.replaceWith(frag);
      } else if (nd.nodeType === 1) walk(nd);
    });
  };
  walk(h);
  h.classList.remove('reveal');
  h.classList.add('split');
}
splitTargets.forEach(splitWords);

['.stats', '.rows', '.cards', '.edu', '.about-grid', '.contact-grid'].forEach(sel => {
  const box = $(sel); if (!box) return;
  $$(':scope > .reveal', box).forEach((el, i) => el.style.setProperty('--d', (i * 0.12) + 's'));
});
$$('.hero .reveal').forEach((el, i) => el.style.setProperty('--d', (0.55 + i * 0.18) + 's'));
$$('.ledger .row, .ledger .ok').forEach((el, i) => el.style.setProperty('--d', (0.45 + i * 0.22) + 's'));

const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }) : null;
function startReveals() {
  const els = $$('.reveal, .split');
  if (io) els.forEach(el => io.observe(el)); else els.forEach(el => el.classList.add('visible'));
}

const curtain = $('#curtain');
function ready() {
  document.documentElement.classList.add('ready');
  if (curtain) {
    curtain.classList.add('hide');
    curtain.addEventListener('transitionend', e => { if (e.target === curtain) curtain.style.display = 'none'; });
    setTimeout(() => { curtain.style.display = 'none'; }, 1600);
  }
  startReveals();
}
const minWait = new Promise(r => setTimeout(r, reduce ? 0 : 950));
const fontsReady = (document.fonts && document.fonts.ready) || Promise.resolve();
Promise.race([Promise.all([minWait, fontsReady]), new Promise(r => setTimeout(r, 2400))]).then(ready);

const hero = $('.hero');
if (hero && !reduce) {
  ['o1', 'o2'].forEach(c => { const o = document.createElement('div'); o.className = 'orb ' + c; o.setAttribute('aria-hidden', 'true'); hero.prepend(o); });
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    hero.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  });
}

if (canHover) {
  $$('.card, .stat.light, .job, .contact-form, .featured, .srow').forEach(el => {
    el.classList.add('spot');
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
}

if (canHover && !reduce) {
  $$('.pill:not(.small), .nav-cta').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.16;
      const y = (e.clientY - r.top - r.height / 2) * 0.26;
      b.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}

const navbar = $('#navbar');
const toTop = $('#to-top');
const progress = $('#progress');
const sections = $$('main section[id]');
const links = $$('#nav-menu a');
let lastY = window.scrollY, ticking = false;

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
  navbar.classList.toggle('scrolled', y > 20);
  toTop.classList.toggle('show', y > 500);
  const menuOpen = menu.classList.contains('open');
  navbar.classList.toggle('hide', y > 240 && y > lastY + 4 && !menuOpen);
  if (y < lastY - 4 || y <= 240) navbar.classList.remove('hide');
  lastY = y;

  let current = '';
  sections.forEach(sec => { if (y >= sec.offsetTop - 140) current = sec.id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const rv = $('#ravan-video');
if (rv) {
  const wrap = rv.parentElement;
  const src = rv.querySelector('source');
  const showFallback = () => wrap.classList.add('no-video');
  rv.addEventListener('error', showFallback);
  if (src) src.addEventListener('error', showFallback);
}

const form = $('#contact-form');
const status = $('#form-status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#cf-name').value.trim();
  const email = $('#cf-email').value.trim();
  const message = $('#cf-message').value.trim();

  status.className = 'form-status';
  if (!name || !email || !message) {
    status.textContent = 'Please fill in all fields.';
    status.classList.add('error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = 'Please enter a valid email address.';
    status.classList.add('error');
    return;
  }

  const subject = encodeURIComponent('Job enquiry from ' + name);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name + '\nEmail: ' + email);
  window.location.href = 'mailto:krevanth770@gmail.com?subject=' + subject + '&body=' + body;

  status.textContent = 'Opening your email app...';
  status.classList.add('ok');
  form.reset();
});

const clockEl = $('#clock');
if (clockEl) {
  const tick = () => {
    clockEl.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false });
  };
  tick();
  setInterval(tick, 1000);
}

const net = document.createElement('canvas');
net.id = 'net';
net.setAttribute('aria-hidden', 'true');
if (hero && !reduce) {
  hero.prepend(net);
  const ctx = net.getContext('2d');
  let W = 0, H = 0, pts = [], mouse = { x: -999, y: -999 }, running = true;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const colour = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4f46e5';
  function size() {
    const r = hero.getBoundingClientRect();
    W = r.width; H = r.height;
    net.width = W * dpr; net.height = H * dpr;
    net.style.width = W + 'px'; net.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(90, Math.max(28, W * H / 16000)));
    pts = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35
    }));
  }
  size();
  window.addEventListener('resize', size);
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  new IntersectionObserver(es => { running = es[0].isIntersecting; if (running) draw(); }).observe(hero);
  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    const c = colour();
    ctx.fillStyle = c;
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 140 && d > 0) { p.x += dx / d * 1.4; p.y += dy / d * 1.4; }
      ctx.globalAlpha = .7;
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 6.283); ctx.fill();
    }
    ctx.strokeStyle = c; ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 120) {
          ctx.globalAlpha = (1 - d / 120) * .35;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      const m = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y);
      if (m < 170) {
        ctx.globalAlpha = (1 - m / 170) * .7;
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

if (canHover && !reduce) {
  $$('.card, .stat, .job, .featured').forEach(el => {
    el.classList.add('tilt');
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      el.style.setProperty('--rx', (-y * 6).toFixed(2) + 'deg');
      el.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
    });
  });
}

const GLYPHS = '01<>/{}[]#$%+*=';
function scramble(el, final) {
  if (reduce) return;
  let f = 0;
  const total = 14;
  clearInterval(el._sc);
  el._sc = setInterval(() => {
    el.textContent = [...final].map((ch, i) =>
      ch === ' ' || i < f * final.length / total ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    ).join('');
    if (++f > total) { clearInterval(el._sc); el.textContent = final; }
  }, 32);
}
$$('.nav-menu a:not(.nav-cta)').forEach(a => {
  const t = a.textContent;
  a.addEventListener('pointerenter', () => scramble(a, t));
});
const eyeObs = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { scramble(e.target, e.target.dataset.t); eyeObs.unobserve(e.target); } });
}, { threshold: 1 }) : null;
$$('.eyebrow').forEach(el => { el.dataset.t = el.textContent; if (eyeObs) eyeObs.observe(el); });

if (canHover && !reduce) {
  const dot = document.createElement('div'); dot.className = 'cur-dot';
  const ring = document.createElement('div'); ring.className = 'cur-ring';
  [dot, ring].forEach(n => { n.setAttribute('aria-hidden', 'true'); document.body.appendChild(n); });
  let tx = -100, ty = -100, rx = -100, ry = -100;
  window.addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate(${tx}px, ${ty}px)`;
    document.documentElement.classList.add('has-cur');
  });
  document.addEventListener('pointerleave', () => document.documentElement.classList.remove('has-cur'));
  (function follow() {
    rx += (tx - rx) * .16; ry += (ty - ry) * .16;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(follow);
  })();
  document.addEventListener('pointerover', e => {
    ring.classList.toggle('big', !!e.target.closest('a, button, input, textarea, .card, .featured'));
  });
}

const pal = $('#palette'), palIn = $('#pal-input'), palList = $('#pal-list');
const items = [
  ['Home', '#home'], ['About', '#about'], ['Skills', '#skills'], ['Experience', '#experience'],
  ['Work and projects', '#projects'], ['Ravan demo video', '#ravan-video'], ['Education', '#education'],
  ['Contact', '#contact'], ['Toggle light / dark', 'theme'], ['Email me', 'mailto:krevanth770@gmail.com']
];
let sel = 0, shown = items;
function renderPal() {
  const q = palIn.value.trim().toLowerCase();
  shown = items.filter(i => i[0].toLowerCase().includes(q));
  sel = Math.min(sel, Math.max(shown.length - 1, 0));
  palList.innerHTML = '';
  shown.forEach((it, i) => {
    const li = document.createElement('li');
    li.textContent = it[0];
    li.className = i === sel ? 'on' : '';
    li.addEventListener('click', () => go(it));
    palList.appendChild(li);
  });
}
function openPal() { pal.hidden = false; palIn.value = ''; sel = 0; renderPal(); setTimeout(() => palIn.focus(), 30); }
function closePal() { pal.hidden = true; }
function go(it) {
  closePal();
  if (it[1] === 'theme') themeBtn.click();
  else if (it[1].startsWith('mailto:')) window.location.href = it[1];
  else { const t = $(it[1]); if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
}
$('#cmd-btn').addEventListener('click', openPal);
pal.addEventListener('click', e => { if (e.target === pal) closePal(); });
palIn.addEventListener('input', () => { sel = 0; renderPal(); });
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? openPal() : closePal(); return; }
  if (pal.hidden) return;
  if (e.key === 'Escape') closePal();
  else if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % shown.length; renderPal(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + shown.length) % shown.length; renderPal(); }
  else if (e.key === 'Enter' && shown[sel]) go(shown[sel]);
});
