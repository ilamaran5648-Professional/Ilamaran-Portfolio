/**
 * ==========================================================================
 * ILAMARAN R. — PORTFOLIO SCRIPT (Vanilla JavaScript)
 * Modules: Navigation, Project Filtering, Scroll Dynamics & Form Validation
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --------------------------------------------------------------------------
  // 01. ELEMENT REFERENCES
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTop');

  // Project filter elements
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-showcase-card');

  // Contact form elements
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const formStatusBanner = document.getElementById('formStatusBanner');

  // --------------------------------------------------------------------------
  // 02. RESPONSIVE MOBILE NAVIGATION DRAWER
  // Handles toggle open/close, accessibility ARIA attributes, and outside clicks
  // --------------------------------------------------------------------------
  if (navToggle && primaryNav) {
    const toggleMenu = () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      primaryNav.classList.toggle('is-open');
    };

    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close when clicking any nav item
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close with Escape key for keyboard accessibility
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        closeMenu();
        navToggle.focus();
      }
    });

    // Close when clicking outside of the header
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target) && primaryNav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 03. HEADER SCROLL ELEVATION
  // Adds contrast border and subtle shadow when scrolled past top threshold
  // --------------------------------------------------------------------------
  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Run immediately on mount

  // --------------------------------------------------------------------------
  // 04. ACTIVE NAVIGATION LINK OBSERVER
  // Dynamically highlights the navigation item corresponding to current section
  // --------------------------------------------------------------------------
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -55% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // --------------------------------------------------------------------------
  // 05. INTERACTIVE PROJECT FILTERING
  // Filters project cards by data-category attribute with ARIA tab semantics
  // --------------------------------------------------------------------------
  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');

        // Update active state on buttons
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter cards
        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 06. SCROLL REVEAL ANIMATIONS
  // Subtle staggered entrance of content elements as they enter the viewport
  // --------------------------------------------------------------------------
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll(
      '.about-grid, .skills-tier-grid, .project-showcase-card, .timeline-card, .education-card, .contact-grid'
    );

    revealElements.forEach(el => el.classList.add('reveal-init'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  
  // --------------------------------------------------------------------------
  // 07. CONTACT FORM VALIDATION + FASTAPI EMAIL SUBMISSION
  // --------------------------------------------------------------------------
  if (contactForm && nameInput && emailInput && messageInput) {
    const subjectInput = document.getElementById('contactSubject');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const submitBtn = document.getElementById('submitBtn');

    // Backend API Endpoint
    // Defaults to deployed production FastAPI service on Render
    // For local development, override via: window.PORTFOLIO_API_URL = 'http://127.0.0.1:8000/api/contact';
    const PRODUCTION_API_URL = 'https://ilamaran-portfolio-api.onrender.com/api/contact';
    const API_URL = window.PORTFOLIO_API_URL || PRODUCTION_API_URL;

    let isSubmitting = false;

    const validateName = () => {
      const value = nameInput.value.trim();

      if (value.length < 2) {
        setFieldError(nameInput, nameError, 'Name must be at least 2 characters.');
        return false;
      }

      clearFieldError(nameInput, nameError);
      return true;
    };

    const validateEmail = () => {
      const value = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        setFieldError(emailInput, emailError, 'Please enter a valid email address.');
        return false;
      }

      clearFieldError(emailInput, emailError);
      return true;
    };

    const validateMessage = () => {
      const value = messageInput.value.trim();

      if (value.length < 10) {
        setFieldError(messageInput, messageError, 'Message must be at least 10 characters.');
        return false;
      }

      clearFieldError(messageInput, messageError);
      return true;
    };

    const setFieldError = (input, errorEl, message) => {
      input.classList.add('has-error');

      if (errorEl) {
        errorEl.textContent = message;
      }
    };

    const clearFieldError = (input, errorEl) => {
      input.classList.remove('has-error');

      if (errorEl) {
        errorEl.textContent = '';
      }
    };

    // Live validation on blur
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    // Clear validation error on input
    nameInput.addEventListener('input', () => clearFieldError(nameInput, nameError));
    emailInput.addEventListener('input', () => clearFieldError(emailInput, emailError));
    messageInput.addEventListener('input', () => clearFieldError(messageInput, messageError));

    // Submit form to FastAPI
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Prevent duplicate concurrent submissions
      if (isSubmitting) return;

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMessageValid = validateMessage();

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        if (formStatusBanner) {
          formStatusBanner.className = 'form-status-banner is-error';
          formStatusBanner.textContent =
            'Please correct the highlighted errors before submitting.';
        }

        if (!isNameValid) nameInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else messageInput.focus();

        return;
      }

      isSubmitting = true;
      const originalButtonHTML = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('span');
        if (btnText) {
          btnText.textContent = 'Sending...';
        } else {
          submitBtn.textContent = 'Sending...';
        }
      }

      if (formStatusBanner) {
        formStatusBanner.className = 'form-status-banner is-loading';
        formStatusBanner.textContent = 'Sending your message...';
      }

      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: (subjectInput && subjectInput.value.trim()) || 'Portfolio Contact Message',
        message: messageInput.value.trim()
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        let result = {};
        try {
          result = await response.json();
        } catch {
          result = {};
        }

        if (!response.ok) {
          let errorMessage = 'Unable to send your message. Please try again.';
          if (typeof result.detail === 'string') {
            errorMessage = result.detail;
          } else if (Array.isArray(result.detail) && result.detail.length > 0) {
            errorMessage = result.detail.map(d => d.msg || JSON.stringify(d)).join('; ');
          } else if (response.status === 502) {
            errorMessage = 'Email service is temporarily unavailable. Please try again later or email directly.';
          }
          throw new Error(errorMessage);
        }

        if (formStatusBanner) {
          formStatusBanner.className = 'form-status-banner is-success';
          formStatusBanner.textContent =
            'Thank you! Your message has been sent successfully.';
        }

        // Reset form inputs only upon successful send
        contactForm.reset();

        clearFieldError(nameInput, nameError);
        clearFieldError(emailInput, emailError);
        clearFieldError(messageInput, messageError);

      } catch (error) {
        console.error('Contact form error:', error);

        let displayMessage = error.message;
        if (!navigator.onLine) {
          displayMessage = 'You appear to be offline. Please check your internet connection.';
        } else if (error.name === 'TypeError' || (error.message && error.message.includes('fetch'))) {
          if (API_URL.includes('127.0.0.1') || API_URL.includes('localhost')) {
            displayMessage = 'Could not connect to backend server. Please verify FastAPI is running at http://127.0.0.1:8000, or contact me directly at ilamaran5648@gmail.com.';
          } else {
            displayMessage = 'Could not connect to backend server. Please try again shortly, or contact me directly at ilamaran5648@gmail.com.';
          }
        }

        if (formStatusBanner) {
          formStatusBanner.className = 'form-status-banner is-error';
          formStatusBanner.textContent = displayMessage || 'Something went wrong. Please try again.';
        }

      } finally {
        isSubmitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalButtonHTML;
        }
      }
    });
  }


  // --------------------------------------------------------------------------
  // 08. SMOOTH SCROLL BACK TO TOP
  // --------------------------------------------------------------------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      const homeAnchor = document.getElementById('home');
      if (homeAnchor) {
        homeAnchor.focus({ preventScroll: true });
      }
    });
  }
});
