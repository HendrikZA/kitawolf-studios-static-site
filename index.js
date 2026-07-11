document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.getElementById('site-header');
  
  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check in case page is loaded scrolled down

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- Active Nav Highlighting on Scroll ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  function highlightNav() {
    let scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Handle home link when scrolled to top
    if (window.scrollY < 100) {
      navLinks.forEach(link => link.classList.remove('active'));
      const homeLink = document.getElementById('link-home');
      if (homeLink) homeLink.classList.add('active');
    }
  }
  
  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // --- Contact Form Submission Handling ---
  const contactForm = document.getElementById('project-contact-form');
  const submitStatus = document.getElementById('submit-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Clear previous status
      submitStatus.className = 'submit-status';
      submitStatus.textContent = '';
      
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');
      
      let isValid = true;
      let errorMsgs = [];
      
      // Simple validation checks
      if (!nameInput.value.trim()) {
        isValid = false;
        errorMsgs.push('Name is required');
      }
      
      if (!emailInput.value.trim()) {
        isValid = false;
        errorMsgs.push('Email is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        isValid = false;
        errorMsgs.push('Please enter a valid email address');
      }
      
      if (!messageInput.value.trim()) {
        isValid = false;
        errorMsgs.push('Project details are required');
      }
      
      if (!isValid) {
        submitStatus.className = 'submit-status error';
        submitStatus.textContent = errorMsgs.join('. ');
        return;
      }
      
      // Simulate submission
      const submitBtn = document.getElementById('contact-submit');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
      
      // Emulate network latency
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        submitStatus.className = 'submit-status success';
        submitStatus.textContent = `Thank you, ${nameInput.value.trim()}! Your message has been sent successfully. We will reach out to you within 24-48 hours.`;
        
        // Reset form
        contactForm.reset();
      }, 1500);
    });
  }
});
