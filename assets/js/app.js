// Burger menu toggle
const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav');

if (burgerMenu && nav) {
  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });
}

// Mobile dropdown toggle
const dropdownNavItem = document.querySelector('.nav__item:has(.nav__drop-menu)');
if (dropdownNavItem) {
  const dropdownLink = dropdownNavItem.querySelector('.nav__link');
  if (dropdownLink) {
    dropdownLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdownNavItem.classList.toggle('active');
      }
    });
  }
}

// Testimonials slider
const testimonialsGrid = document.querySelector('.testimonials__grid');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

if (testimonialsGrid && arrowLeft && arrowRight) {
  const cardWidth = 492; // width of one card
  const gap = 25; // gap between cards
  const scrollAmount = cardWidth + gap;

  arrowLeft.addEventListener('click', () => {
    testimonialsGrid.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  arrowRight.addEventListener('click', () => {
    testimonialsGrid.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
}

// Contact form validation
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  const nameInput = contactForm.querySelector('#name');
  const emailInput = contactForm.querySelector('#email');
  const phoneInput = contactForm.querySelector('#phone');
  const messageInput = contactForm.querySelector('#message');

  const setMessage = (input, msg) => {
    input.setCustomValidity(msg || '');
  };

  const clearOnInput = (input) => {
    input.addEventListener('input', () => setMessage(input, ''));
  };

  [nameInput, emailInput, phoneInput, messageInput].forEach((el) => {
    if (el) clearOnInput(el);
  });

  contactForm.addEventListener('submit', (e) => {
    let valid = true;

    if (nameInput) {
      if (nameInput.value.trim().length < 2) {
        setMessage(nameInput, 'Please enter your name (min 2 characters).');
        valid = false;
      }
    }

    if (emailInput) {
      if (!emailInput.validity.valid) {
        setMessage(emailInput, 'Please enter a valid email address.');
        valid = false;
      }
    }

    if (phoneInput && phoneInput.value.trim() !== '') {
      const re = /^[+0-9 ()-]{7,20}$/;
      if (!re.test(phoneInput.value.trim())) {
        setMessage(phoneInput, 'Invalid phone format.');
        valid = false;
      }
    }

    if (messageInput && messageInput.value.length > 2000) {
      setMessage(messageInput, 'Message is too long (max 2000 characters).');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
      contactForm.reportValidity();
    }
  });
}

