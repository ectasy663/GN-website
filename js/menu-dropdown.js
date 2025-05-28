// Fallback: Enhance dropdowns with fade/slide effect if not handled elsewhere
// (dropdown.js already handles logic, so this is for extra UI polish)
document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu functionality
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburgerMenu && navLinks) {
    hamburgerMenu.addEventListener('click', function() {
      hamburgerMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Prevent body scrolling when menu is open
      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on nav links
    navLinks.addEventListener('click', function(e) {
      if (e.target.classList.contains('nav-link') && !e.target.closest('.dropdown')) {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Handle dropdown toggles in mobile menu
    const dropdownToggles = document.querySelectorAll('.dropdown > .nav-link');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const dropdownMenu = this.nextElementSibling;
          dropdownMenu.classList.toggle('show');
        }
      });
    });
  }
  
  // Original dropdown enhancement code
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.addEventListener('transitionend', function() {
      if (!menu.classList.contains('show')) {
        menu.style.display = '';
      }
    });
    menu.addEventListener('show', function() {
      menu.style.display = 'block';
    });
  });
});