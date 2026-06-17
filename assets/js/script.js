// ============================
// AOS INIT
// ============================
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 700,
    once: true,
    offset: 60
  });

  initMobileMenu();
  initCounters();
  initSwiper();
});

// ============================
// MOBILE MENU TOGGLE
// ============================
function initMobileMenu() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');

  if (!menuToggle) return;

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('menu-open');
    const icon = menuToggle.querySelector('i');
    if (navbar.classList.contains('menu-open')) {
      icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
    }
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('menu-open');
      const icon = menuToggle.querySelector('i');
      icon.classList.replace('fa-xmark', 'fa-bars');
    });
  });
}

// ============================
// ANIMATED STAT COUNTERS
// ============================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1500;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    };
    requestAnimationFrame(step);
  };

  // Trigger each counter once it scrolls into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ============================
// SWIPER (TESTIMONIALS)
// ============================
function initSwiper() {
  const swiperEl = document.querySelector('.testimonial-swiper');
  if (!swiperEl || typeof Swiper === 'undefined') return;

  new Swiper('.testimonial-swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    spaceBetween: 30
  });
}

// ============================
// STICKY NAV SHADOW ON SCROLL
// ============================
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});