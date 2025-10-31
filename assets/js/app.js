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

