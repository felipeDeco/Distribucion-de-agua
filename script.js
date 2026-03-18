/**
 * AquaPura - Water Distribution Website
 * Interactive JavaScript Module
 */

document.addEventListener('DOMContentLoaded', () => {
  // === Page Loader ===
  const pageLoader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
      setTimeout(() => pageLoader.remove(), 500);
    }, 800);
  });

  // === Navbar Scroll Effect ===
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Back to top button
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === Mobile Menu Toggle ===
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // === Smooth Scroll for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // === Animated Counter ===
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      el.textContent = current.toLocaleString('es-MX');

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target.toLocaleString('es-MX');
      }
    };

    requestAnimationFrame(updateCounter);
  };

  // === Scroll Reveal Animation ===
  const revealElements = document.querySelectorAll('.reveal');
  const counterElements = document.querySelectorAll('[data-target]');
  const animatedCounters = new Set();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Counter observer
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedCounters.has(entry.target)) {
        animatedCounters.add(entry.target);
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counterElements.forEach(el => counterObserver.observe(el));

  // === Bubble Animation (Hero Section) ===
  const bubblesContainer = document.getElementById('bubbles-container');
  
  const createBubble = () => {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    const size = Math.random() * 60 + 20;
    const left = Math.random() * 100;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 4;

    bubble.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    bubblesContainer.appendChild(bubble);

    // Remove bubble after animation
    setTimeout(() => {
      bubble.remove();
    }, (duration + delay) * 1000);
  };

  // Create initial bubbles
  for (let i = 0; i < 15; i++) {
    createBubble();
  }

  // Continuously create bubbles
  setInterval(createBubble, 2000);

  // === Button Ripple Effect ===
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // === Contact Form Handling ===
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    const submitBtn = contactForm.querySelector('.form-submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      Enviando...
    `;

    // Add spin animation dynamically
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
    document.head.appendChild(style);

    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.classList.add('show');

      // Log form data (in production, send to server)
      console.log('Form submitted:', data);

      // Reset after 5 seconds
      setTimeout(() => {
        contactForm.style.display = '';
        formSuccess.classList.remove('show');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          Enviar Mensaje
        `;
      }, 5000);
    }, 1500);
  });

  // === Active Navigation Link Highlight ===
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.querySelectorAll('a').forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + sectionId) {
            link.style.color = 'white';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // === Parallax effect for hero ===
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      hero.style.setProperty('--parallax-y', `${scrollY * 0.3}px`);
      const heroImage = document.querySelector('.hero-image img');
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    }
  }, { passive: true });

  // === Feature cards tilt effect ===
  document.querySelectorAll('.feature-card, .service-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // === Typed effect for hero badge (optional enhancement) ===
  const heroBadge = document.querySelector('.hero-badge span');
  if (heroBadge) {
    const originalText = heroBadge.textContent;
    const texts = [
      '🏆 #1 en Distribución de Agua',
      '💧 Agua 99.9% Purificada',
      '🚚 Entrega Gratis en tu Primera Orden'
    ];
    let currentIndex = 0;

    const cycleText = () => {
      currentIndex = (currentIndex + 1) % texts.length;
      heroBadge.style.opacity = '0';
      heroBadge.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        heroBadge.textContent = texts[currentIndex];
        heroBadge.style.opacity = '1';
        heroBadge.style.transform = 'translateY(0)';
      }, 300);
    };

    heroBadge.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setInterval(cycleText, 4000);
  }

  // === Preload critical images ===
  const preloadImages = ['assets/images/hero-water.png'];
  preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
});
