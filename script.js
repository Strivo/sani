// ===============================
// CUSTOM CURSOR
// ===============================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorOutline.style.borderColor = 'var(--accent)';
  });
  el.addEventListener('mouseleave', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorOutline.style.borderColor = 'rgba(58, 12, 163, 0.3)';
  });
});

// ===============================
// PROGRESS BAR
// ===============================
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('progressBar').style.width = scrolled + '%';
});

// ===============================
// NAVIGATION
// ===============================
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Show/hide header on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('visible');
  } else {
    header.classList.remove('visible');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===============================
// SMOOTH SCROLL
// ===============================
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function scrollToProjects() {
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

// ===============================
// TYPING ANIMATION (ENHANCED)
// ===============================
const textArray = [
  "Full Stack Developer",
  "UI/UX Designer",
  "Problem Solver",
  "Tech Enthusiast"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
  const currentWord = textArray[textIndex];
  const typingElement = document.getElementById('typing');

  if (!isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      typingDelay = 2000; // Pause at end
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      typingDelay = 500; // Pause before new word
    }
  }

  setTimeout(typeEffect, typingDelay);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// ===============================
// COUNTER ANIMATION
// ===============================
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
};

// Trigger counters when in view
const observerOptions = {
  threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
  counterObserver.observe(counter);
});

// ===============================
// SKILLS ANIMATION
// ===============================
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.skill-progress');
      progressBars.forEach(bar => {
        const level = bar.parentElement.parentElement.getAttribute('data-level');
        bar.style.width = level + '%';
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
  skillsObserver.observe(category);
});

// ===============================
// PROJECT FILTERING
// ===============================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    // Filter projects
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.5s';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===============================
// TESTIMONIAL SLIDER
// ===============================
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.getElementById('testimonialDots');

// Create dots
testimonialSlides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => showTestimonial(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  testimonialSlides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });
  
  testimonialSlides[index].classList.add('active');
  dots[index].classList.add('active');
  currentTestimonial = index;
}

function changeTestimonial(direction) {
  currentTestimonial += direction;
  if (currentTestimonial >= testimonialSlides.length) currentTestimonial = 0;
  if (currentTestimonial < 0) currentTestimonial = testimonialSlides.length - 1;
  showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
setInterval(() => {
  changeTestimonial(1);
}, 5000);

// ===============================
// PROJECT MODAL (ENHANCED)
// ===============================
function openModal(title, desc, tech, link) {
  const modal = document.getElementById('modal');
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalTech').innerText = tech;
  document.getElementById('modalLink').href = link;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on outside click
window.addEventListener('click', (e) => {
  const modal = document.getElementById('modal');
  if (e.target === modal) {
    closeModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===============================
// LOADER
// ===============================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
  }, 500);
});

// ===============================
// DARK MODE (ENHANCED)
// ===============================
const toggleBtn = document.getElementById('themeToggle');

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  }
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggleBtn.textContent = isDark ? '☀️' : '🌙';
  
  // Add rotation animation
  toggleBtn.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    toggleBtn.style.transform = '';
  }, 300);
});

initTheme();

// ===============================
// CONTACT FORM (ENHANCED)
// ===============================
const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('.submit-btn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      const API_URL = 'https://devsani-backend.onrender.com/send';
      
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Success state
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        
        showToast('Message sent successfully! I\'ll get back to you soon.');
        form.reset();
        
        setTimeout(() => {
          submitBtn.classList.remove('success');
          submitBtn.disabled = false;
        }, 3000);
      } else {
        throw new Error(data.message || 'Error sending message');
      }
    } catch (err) {
      console.error(err);
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      showToast('Failed to send message. Please try again.', 'error');
    }
  });
}

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  toastMessage.textContent = message;
  toast.style.borderLeftColor = type === 'success' ? '#10b981' : '#ef4444';
  toast.querySelector('i').className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
  toast.querySelector('i').style.color = type === 'success' ? '#10b981' : '#ef4444';
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ===============================
// BACK TO TOP
// ===============================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===============================
// SCROLL REVEAL (Additional to AOS)
// ===============================
const revealElements = document.querySelectorAll('.service-card, .project-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease-out';
  revealObserver.observe(el);
});

// ===============================
// PARALLAX EFFECT
// ===============================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const orbs = document.querySelectorAll('.gradient-orb');
  
  orbs.forEach((orb, index) => {
    const speed = 0.5 + (index * 0.2);
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});