/**
 * Osama Khalil — Senior DevOps Engineer & Azure Cloud Architect
 * Portfolio Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initActiveNavLink();
  initSkillsFilter();
  initScrollReveal();
  initKeyboardListeners();
});

/* ==============================================================================
   1. NAVBAR SCROLL EFFECT
   ============================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==============================================================================
   2. MOBILE HAMBURGER MENU
   ============================================================================== */
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

/* ==============================================================================
   3. ACTIVE NAVIGATION LINK ON SCROLL
   ============================================================================== */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==============================================================================
   4. SKILLS CATEGORY FILTERING
   ============================================================================== */
function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!filterButtons.length || !skillCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==============================================================================
   5. ARCHITECTURE TABS SWITCHER
   ============================================================================== */
window.switchArchTab = function(tabId) {
  // Update Tab buttons
  const buttons = document.querySelectorAll('.arch-tab-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabId)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update Tab contents
  const contents = document.querySelectorAll('.arch-tab-content');
  contents.forEach(content => {
    if (content.id === tabId) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
};

/* ==============================================================================
   6. LIGHTBOX MODAL CONTROLLER
   ============================================================================== */
window.openLightbox = function(imageSrc, titleText) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const downloadLink = document.getElementById('lightbox-download-link');

  if (!modal || !img) return;

  img.src = imageSrc;
  img.alt = titleText || 'Technical Diagram';
  if (title) title.innerText = titleText || 'Technical Architecture Diagram';
  if (downloadLink) {
    downloadLink.href = imageSrc;
    downloadLink.setAttribute('download', imageSrc.split('/').pop());
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Lock background scroll
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Unlock scroll
};

function initKeyboardListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeLightbox();
    }
  });
}

/* ==============================================================================
   7. CLIPBOARD COPY UTILITY & TOAST
   ============================================================================== */
window.copyToClipboard = function(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied to clipboard: ${text}`);
    if (buttonElement) {
      const originalHtml = buttonElement.innerHTML;
      buttonElement.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
      setTimeout(() => {
        buttonElement.innerHTML = originalHtml;
      }, 2000);
    }
  }).catch(() => {
    // Fallback prompt
    prompt('Copy value:', text);
  });
};

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==============================================================================
   8. CONTACT FORM SUBMISSION
   ============================================================================== */
window.handleContactSubmit = function(event) {
  event.preventDefault();

  const name = document.getElementById('sender-name').value;
  const email = document.getElementById('sender-email').value;
  const subject = document.getElementById('sender-subject').value;
  const message = document.getElementById('sender-message').value;

  const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject}`);
  const mailtoBody = encodeURIComponent(
    `Hello Osama,\n\n${message}\n\nFrom:\n${name}\nEmail: ${email}`
  );

  const mailtoUrl = `mailto:khalil.osama91@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  window.location.href = mailtoUrl;

  showToast('Opening default email client...');
};

/* ==============================================================================
   9. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ============================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}
