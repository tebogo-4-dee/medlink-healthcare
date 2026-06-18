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
  initDoctorFilter();
  initFAQ();
  initAppointmentForm();
  initDoctorFilter();
  initBlogFilters();
  initAppointmentForm();
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

// ============================
// DOCTOR FILTER
// ============================
function initDoctorFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const doctorCards = document.querySelectorAll('.doctor-detailed-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      doctorCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ============================
// APPOINTMENT FORM
// ============================
function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  if (!form) return;

  const confirmationBox = document.getElementById('confirmationMessage');
  const confirmName = document.getElementById('confirmName');
  const confirmRef = document.getElementById('confirmRef');
  const bookAnotherBtn = document.getElementById('bookAnotherBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const firstName = document.getElementById('firstName').value;
    const reference = 'MED-' + Math.floor(100000 + Math.random() * 900000);

    confirmName.textContent = firstName;
    confirmRef.textContent = reference;

    form.hidden = true;
    confirmationBox.hidden = false;
    confirmationBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  bookAnotherBtn.addEventListener('click', () => {
    form.reset();
    form.hidden = false;
    confirmationBox.hidden = true;
  });
}

// ============================
// BLOG CATEGORY FILTER + SEARCH
// ============================
function initBlogFilters() {
  const categoryBtns = document.querySelectorAll('.category-btn');
  const blogCards = document.querySelectorAll('#blogGrid .blog-card');
  const searchForm = document.getElementById('blogSearchForm');
  const searchInput = document.getElementById('blogSearchInput');

  if (!blogCards.length) return;

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      blogCards.forEach(card => {
        card.style.display =
          (filter === 'all' || card.getAttribute('data-category') === filter)
            ? '' : 'none';
      });
    });
  });

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const term = searchInput.value.trim().toLowerCase();

      blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(term) ? '' : 'none';
      });
    });
  }
}
