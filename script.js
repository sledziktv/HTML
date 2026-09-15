/* ==========================================
   1. ANIMATED GALAXY STAR BACKGROUND
   ========================================== */
const canvas = document.getElementById('galaxy-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
const STAR_COUNT = 280;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.2,
      alpha: Math.random(),
      dAlpha: (Math.random() - 0.5) * 0.015,
      color: ['#7b2ff7', '#00d4ff', '#f72fa0', '#ffffff'][Math.floor(Math.random() * 4)]
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const grd1 = ctx.createRadialGradient(canvas.width * 0.2, canvas.height * 0.3, 0, canvas.width * 0.2, canvas.height * 0.3, 400);
  grd1.addColorStop(0, 'rgba(123,47,247,0.06)');
  grd1.addColorStop(1, 'transparent');
  ctx.fillStyle = grd1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const grd2 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.7, 0, canvas.width * 0.8, canvas.height * 0.7, 350);
  grd2.addColorStop(0, 'rgba(0,212,255,0.05)');
  grd2.addColorStop(1, 'transparent');
  ctx.fillStyle = grd2;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => {
    s.alpha += s.dAlpha;
    if (s.alpha <= 0.1 || s.alpha >= 1) s.dAlpha *= -1;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.globalAlpha = s.alpha;
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}

resizeCanvas();
createStars();
drawStars();
window.addEventListener('resize', () => { resizeCanvas(); createStars(); });


/* ==========================================
   2. SCROLL REVEAL
   ========================================== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));


/* ==========================================
   3. SKILL BARS ANIMATION
   ========================================== */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(el => skillObserver.observe(el));


/* ==========================================
   4. MOBILE BURGER MENU
   ========================================== */
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


/* ==========================================
   5. NAVBAR BG ON SCROLL
   ========================================== */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 60
    ? 'rgba(5,6,15,.9)'
    : 'rgba(5,6,15,.6)';
});


/* ==========================================
   6. PARALLAX HERO
   ========================================== */
const hero = document.getElementById('hero');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    hero.style.transform = `translateY(${y * 0.3}px)`;
    hero.style.opacity = 1 - y / window.innerHeight;
  }
});


/* ==========================================
   7. PROJECTS LIST – INTERACTIVE PREVIEW
   ========================================== */

// ============================================
// 📝 TUTAJ EDYTUJ SWOJE PROJEKTY
// ============================================
const projectsData = {
  
  // PROJEKT 1
  p1: {
    title: 'Program do automatyzacji działan – Python',
    desc: 'Telegram Toolkit – desktopowa aplikacja ze zintegrowanym zestawem narzędzi do automatyzacji działań na Telegramie, obejmująca scraping danych z grup i kanałów, masową wysyłkę wiadomości oraz filtrowanie użytkowników.',
    img: 'image1.png',
    badge: 'Python',
    tags: ['Python', 'Scrapper', 'Automotion']
  },

  // PROJEKT 2
  p2: {
    title: 'Modele 3D ',
    desc: '',
    img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=900&h=500&fit=crop',
    badge: '3D',
    tags: ['Modelowanie', 'PBR', 'Blender']
  },

  // PROJEKT 3
  p3: {
    title: 'Portfolio',
    desc: 'Ta strona, którą właśnie przeglądasz. Zbudowana od zera w czystym HTML, CSS i JavaScript. Animowane tło galaxy, interaktywna lista projektów, responsywny design',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=500&fit=crop',
    badge: 'Web',
    tags: ['HTML', 'CSS', 'JavaScript']
  },

  // PROJEKT 4
  p4: {
    title: 'Sklep E-commerce',
    desc: 'Responsywny sklep internetowy z koszykiem, filtrowaniem produktów i panelem administracyjnym. Nowoczesny design, szybkie ładowanie i optymalizacja pod SEO.',
    img: 'sklep.png',
    badge: 'E-commerce',
    tags: ['Web', 'Shop', 'Responsive']
  }

};
// ============================================
// KONIEC EDYCJI PROJEKTÓW
// ============================================

const projectItems = document.querySelectorAll('.project-item');
const previewImage = document.getElementById('preview-image');
const previewTitle = document.getElementById('preview-title');
const previewDesc = document.getElementById('preview-desc');
const previewBadge = document.getElementById('preview-badge');
const previewTags = document.getElementById('preview-tags');

function switchProject(id) {
  const data = projectsData[id];
  if (!data) return;

  // fade out
  previewImage.classList.add('fade');
  previewTitle.style.opacity = '0';
  previewDesc.style.opacity = '0';

  setTimeout(() => {
    previewImage.src = data.img;
    previewTitle.textContent = data.title;
    previewDesc.textContent = data.desc;
    previewBadge.textContent = data.badge;
    previewTags.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');

    // fade in
    previewImage.classList.remove('fade');
    previewTitle.style.opacity = '1';
    previewDesc.style.opacity = '1';
  }, 250);
}

projectItems.forEach(item => {
  item.addEventListener('click', () => {
    projectItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    switchProject(item.dataset.project);
  });
});