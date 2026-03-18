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

  // === INTERACTIVE MAP & ORDERING SYSTEM ===
  
  // 1. Distributor Data
  const distributors = [
    {
      id: 1,
      name: "AquaPura - Sucursal Centro",
      address: "Av. Juárez 456, Col. Centro, Guadalajara",
      coords: [20.6744, -103.3440],
      rating: 4.8,
      distance: "1.2 km",
      price: 35
    },
    {
      id: 2,
      name: "AquaPura - Providencia",
      address: "Av. Américas 1500, Providencia, Guadalajara",
      coords: [20.7020, -103.3770],
      rating: 4.9,
      distance: "3.5 km",
      price: 38
    },
    {
      id: 3,
      name: "AquaPura - Chapalita",
      address: "Av. Guadalupe 1200, Chapalita, Zapopan",
      coords: [20.6650, -103.3950],
      rating: 4.7,
      distance: "4.8 km",
      price: 35
    },
    {
      id: 4,
      name: "AquaPura - Tlaquepaque",
      address: "Calle Hidalgo 200, Centro, Tlaquepaque",
      coords: [20.6400, -103.3150],
      rating: 4.6,
      distance: "6.2 km",
      price: 35
    }
  ];

  // 2. Map State
  let map;
  let userMarker;
  let truckMarker;
  let distributorMarkers = [];
  let selectedDistributor = null;
  let orderQuantity = 1;

  // 3. Initialize Map
  const initMap = () => {
    const mapElement = document.getElementById('aquaMap');
    if (!mapElement) return;

    // Use GDL coordinates as default
    const gdlCoords = [20.6719, -103.3489];
    
    map = L.map('aquaMap', {
      scrollWheelZoom: false,
      zoomControl: false
    }).setView(gdlCoords, 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Add User Marker
    const userIcon = L.divIcon({
      className: 'user-marker',
      html: '<div class="user-pulse"></div><div class="user-dot"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    
    userMarker = L.marker(gdlCoords, { icon: userIcon }).addTo(map);
    userMarker.bindPopup("<b>Tu Ubicación</b>").openPopup();

    // Add Distributor Markers
    distributors.forEach(dist => {
      const distIcon = L.divIcon({
        className: 'dist-marker',
        html: '<div class="dist-icon">💧</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker(dist.coords, { icon: distIcon }).addTo(map);
      
      marker.on('click', () => selectDistributor(dist.id));
      
      const popupContent = `
        <div class="distributor-popup">
          <h4>${dist.name}</h4>
          <p>${dist.address}</p>
          <button class="popup-btn" onclick="document.dispatchEvent(new CustomEvent('selectDist', {detail: ${dist.id}}))">
            Seleccionar
          </button>
        </div>
      `;
      marker.bindPopup(popupContent);
      
      distributorMarkers.push({ id: dist.id, marker });
    });

    populateDistributorList();
  };

  // 4. Populate Sidebar List
  const populateDistributorList = () => {
    const list = document.getElementById('distributorList');
    if (!list) return;

    list.innerHTML = distributors.map(dist => `
      <div class="distributor-card" data-id="${dist.id}">
        <div class="distributor-card-name">${dist.name}</div>
        <div class="distributor-card-address">${dist.address}</div>
        <div class="distributor-card-meta">
          <span class="distributor-card-distance">${dist.distance}</span>
          <span class="distributor-card-rating">★ ${dist.rating}</span>
          <span class="distributor-card-price">$${dist.price} MXN</span>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.distributor-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.getAttribute('data-id'));
        selectDistributor(id);
      });
    });
  };

  // 5. Select Distributor Logic
  const selectDistributor = (id) => {
    selectedDistributor = distributors.find(d => d.id === id);
    if (!selectedDistributor) return;

    // Update markers state
    distributorMarkers.forEach(dm => {
      dm.marker.getElement().classList.toggle('selected', dm.id === id);
    });

    // Zoom to marker
    map.flyTo(selectedDistributor.coords, 14, { duration: 1.5 });

    // Show order form
    const distributorList = document.getElementById('distributorList');
    const orderForm = document.getElementById('orderForm');
    const selectedDistInfo = document.getElementById('selectedDistributor');
    
    distributorList.style.display = 'none';
    orderForm.style.display = 'block';
    
    selectedDistInfo.innerHTML = `
      <h4>📍 ${selectedDistributor.name}</h4>
      <p>${selectedDistributor.address}</p>
    `;
    
    updateOrderTotal();
  };

  // Listener for popup button
  document.addEventListener('selectDist', (e) => selectDistributor(e.detail));

  // 6. Order Form Controls
  const qtyValue = document.getElementById('qtyValue');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const orderTotal = document.querySelector('#orderTotal strong');

  const updateOrderTotal = () => {
    if (!selectedDistributor) return;
    qtyValue.textContent = orderQuantity;
    orderTotal.textContent = `$${orderQuantity * selectedDistributor.price} MXN`;
  };

  qtyMinus.addEventListener('click', () => {
    if (orderQuantity > 1) {
      orderQuantity--;
      updateOrderTotal();
    }
  });

  qtyPlus.addEventListener('click', () => {
    if (orderQuantity < 10) {
      orderQuantity++;
      updateOrderTotal();
    }
  });

  document.getElementById('orderBackBtn').addEventListener('click', () => {
    document.getElementById('distributorList').style.display = 'flex';
    document.getElementById('orderForm').style.display = 'none';
    selectedDistributor = null;
  });

  // 7. Tracking Simulation
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  const trackingOverlay = document.getElementById('trackingOverlay');
  const trackingProgressBar = document.getElementById('trackingProgressBar');
  const etaTime = document.getElementById('etaTime');
  let routeLine;
  
  placeOrderBtn.addEventListener('click', () => {
    if (!selectedDistributor) return;

    // Hide order form, show tracking
    document.getElementById('orderPanel').style.display = 'none';
    trackingOverlay.style.display = 'block';

    startTrackingSimulation();
  });

  const startTrackingSimulation = () => {
    const startCoords = selectedDistributor.coords;
    const userLatLng = userMarker.getLatLng();
    const endCoords = [userLatLng.lat, userLatLng.lng];
    
    // Create Route Line
    if (routeLine) map.removeLayer(routeLine);
    routeLine = L.polyline([startCoords, endCoords], {
      color: '#0070cc',
      weight: 4,
      opacity: 0.6,
      dashArray: '10, 10',
      lineCap: 'round'
    }).addTo(map);

    // Create Truck Marker
    const truckIcon = L.divIcon({
      className: 'truck-marker',
      html: '🚚',
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    if (truckMarker) map.removeLayer(truckMarker);
    truckMarker = L.marker(startCoords, { icon: truckIcon, zIndexOffset: 1000 }).addTo(map);

    // Fit map to show both markers
    map.fitBounds(L.latLngBounds([startCoords, endCoords]), { padding: [50, 50] });

    // Simulation Stages
    const stages = [
      { step: 'confirmed', progress: 10, eta: '15 min', wait: 1000 },
      { step: 'preparing', progress: 30, eta: '12 min', wait: 2000 },
      { step: 'onway', progress: 60, eta: '8 min', wait: 0 },
      { step: 'delivered', progress: 100, eta: '0 min', wait: 0 }
    ];

    let currentStage = 0;

    const processStage = () => {
      const stage = stages[currentStage];
      
      // Update UI
      trackingProgressBar.style.width = stage.progress + '%';
      etaTime.textContent = stage.eta;
      
      const stepEl = document.getElementById(`step-${stage.step}`);
      if (stepEl) {
        stepEl.classList.add('completed');
        stepEl.classList.add('active');
        // Remove active from previous
        if (currentStage > 0) {
          const prevStep = document.getElementById(`step-${stages[currentStage-1].step}`);
          if (prevStep) prevStep.classList.remove('active');
        }
      }

      if (stage.step === 'onway') {
        animateTruck(startCoords, endCoords, 6000, () => {
          currentStage++;
          processStage();
        });
      } else if (currentStage < stages.length - 1) {
        setTimeout(() => {
          currentStage++;
          processStage();
        }, stage.wait);
      }
    };

    processStage();
  };

  const animateTruck = (start, end, duration, onComplete) => {
    const startTime = performance.now();
    
    const move = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const lat = start[0] + (end[0] - start[0]) * progress;
      const lng = start[1] + (end[1] - start[1]) * progress;
      
      truckMarker.setLatLng([lat, lng]);
      map.panTo([lat, lng]);

      if (progress < 1) {
        requestAnimationFrame(move);
      } else {
        if (onComplete) onComplete();
      }
    };
    
    requestAnimationFrame(move);
  };

  document.getElementById('trackingClose').addEventListener('click', () => {
    trackingOverlay.style.display = 'none';
    document.getElementById('orderPanel').style.display = 'block';
    document.getElementById('distributorList').style.display = 'flex';
    document.getElementById('orderForm').style.display = 'none';
    
    if (truckMarker) map.removeLayer(truckMarker);
    if (routeLine) map.removeLayer(routeLine);
    
    // Reset steps
    document.querySelectorAll('.tracking-step').forEach(step => step.classList.remove('completed', 'active'));
    document.getElementById('step-confirmed').classList.add('completed');
  });

  // Initialize Map on start
  initMap();
});
