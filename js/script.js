// ===== DARK / LIGHT MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage.split('/').pop()) {
    link.classList.add('active');
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
  document.body.style.overflow =
    nav.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== LIGHTBOX GALLERY =====
if (document.getElementById('lightbox')) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxMeta = document.querySelector('.lightbox-meta');
  const cards = document.querySelectorAll('.art-card');
  let currentIndex = 0;

  cards.forEach((card, index) => {
    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('btn-overlay-primary') ||
          e.target.classList.contains('btn-overlay-secondary')) return;
      currentIndex = index;
      openLightbox(card);
    });
  });

  function openLightbox(card) {
    lightboxImg.src = card.getAttribute('data-src');
    lightboxTitle.textContent = card.getAttribute('data-title');
    lightboxMeta.textContent = card.getAttribute('data-meta');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  document.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelector('.lightbox-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    openLightbox(cards[currentIndex]);
  });

  document.querySelector('.lightbox-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    openLightbox(cards[currentIndex]);
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') document.querySelector('.lightbox-next').click();
    if (e.key === 'ArrowLeft') document.querySelector('.lightbox-prev').click();
    if (e.key === 'Escape') closeLightbox();
  });
}
/// ===== FILTERABLE GALLERY =====
if (document.querySelector('.filter-bar')) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const artCards = document.querySelectorAll('.art-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      artCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all') {
          // Hide commissions from All view
          if (category === 'commission') {
            card.classList.add('hidden');
          } else {
            card.classList.remove('hidden');
          }
        } else if (category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Hide commissions on initial load
  artCards.forEach(card => {
    if (card.getAttribute('data-category') === 'commission') {
      card.classList.add('hidden');
    }
  });
}

// ===== FORM AUTO PRE-FILL =====
if (document.querySelector('.contact-form')) {
  const params = new URLSearchParams(window.location.search);
  const subject = params.get('subject');

  if (subject) {
    const select = document.getElementById('subject');
    const options = Array.from(select.options);
    const match = options.find(opt => 
      opt.value.toLowerCase() === subject.toLowerCase()
    );
    if (match) select.value = match.value;
  }
}
// ===== SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05
  });

  animatedElements.forEach(el => observer.observe(el));
});