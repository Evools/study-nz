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

// Language switcher
if (typeof translations !== 'undefined') {
  let currentLang = localStorage.getItem('language') || 'en';
  const langButtons = document.querySelectorAll('.language .btn');

  // Initialize language
  function setLanguage(lang) {
    currentLang = lang;
    window.currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    // Update button states
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
        btn.classList.remove('btn--secondary');
        btn.classList.add('btn--primary');
      } else {
        btn.classList.remove('active');
        btn.classList.add('btn--secondary');
        btn.classList.remove('btn--primary');
      }
    });

    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        if (element.tagName === 'INPUT' && element.type === 'text' ||
          element.tagName === 'INPUT' && element.type === 'email' ||
          element.tagName === 'INPUT' && element.type === 'tel' ||
          element.tagName === 'TEXTAREA') {
          element.placeholder = translations[lang][key];
        } else if (element.tagName === 'OPTION') {
          element.textContent = translations[lang][key];
        } else {
          element.textContent = translations[lang][key];
        }
      }
    });
  }

  // Language button click handlers
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang === 'ru' || lang === 'en') {
        setLanguage(lang);
      }
    });
  });

  // Initialize language on page load
  setLanguage(currentLang);

  // Export currentLang for use in form validation
  window.currentLang = currentLang;
} else {
  console.warn('Translations not loaded');
  window.currentLang = 'en';
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
    const lang = window.currentLang || 'en';

    if (nameInput) {
      if (nameInput.value.trim().length < 2) {
        const msg = lang === 'ru'
          ? 'Пожалуйста, введите ваше имя (минимум 2 символа).'
          : 'Please enter your name (min 2 characters).';
        setMessage(nameInput, msg);
        valid = false;
      }
    }

    if (emailInput) {
      if (!emailInput.validity.valid) {
        const msg = lang === 'ru'
          ? 'Пожалуйста, введите корректный email адрес.'
          : 'Please enter a valid email address.';
        setMessage(emailInput, msg);
        valid = false;
      }
    }

    if (phoneInput && phoneInput.value.trim() !== '') {
      const re = /^[+0-9 ()-]{7,20}$/;
      if (!re.test(phoneInput.value.trim())) {
        const msg = lang === 'ru'
          ? 'Неверный формат телефона.'
          : 'Invalid phone format.';
        setMessage(phoneInput, msg);
        valid = false;
      }
    }

    if (messageInput && messageInput.value.length > 2000) {
      const msg = lang === 'ru'
        ? 'Сообщение слишком длинное (максимум 2000 символов).'
        : 'Message is too long (max 2000 characters).';
      setMessage(messageInput, msg);
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
      contactForm.reportValidity();
    }
  });
}

