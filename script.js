// ===== Helpers =====
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// ===== Footer year =====
$('#year').textContent = new Date().getFullYear();

// ===== Theme toggle (remembers choice) =====
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

// ===== Mobile menu =====
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

// ===== Typing effect =====
const roles = ['Accountant', 'Tally Prime Expert', 'GST Filing Specialist', 'Reconciliation Professional'];
const typingEl = $('#typing');
let ri = 0, ci = 0, deleting = false;
function type() {
  const word = roles[ri];
  typingEl.textContent = word.slice(0, ci);
  if (!deleting && ci < word.length) { ci++; setTimeout(type, 90); }
  else if (!deleting) { deleting = true; setTimeout(type, 1400); }
  else if (ci > 0) { ci--; setTimeout(type, 45); }
  else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 300); }
}
type();

// ===== Navbar shadow, active link, back-to-top =====
const navbar = $('#navbar');
const toTop = $('#to-top');
const sections = $$('main section[id]');
const links = $$('#nav-menu a');

function onScroll() {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 20);
  toTop.classList.toggle('show', y > 500);

  let current = '';
  sections.forEach(sec => {
    if (y >= sec.offsetTop - 120) current = sec.id;
  });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Scroll reveal =====
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));
} else {
  $$('.reveal').forEach(el => el.classList.add('visible'));
}

// ===== Ravan demo video: show a placeholder if the file is missing =====
const rv = $('#ravan-video');
if (rv) {
  const wrap = rv.parentElement;
  const src = rv.querySelector('source');
  const showFallback = () => wrap.classList.add('no-video');
  rv.addEventListener('error', showFallback);
  if (src) src.addEventListener('error', showFallback);
}

// ===== Contact form (opens the user's email app) =====
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
