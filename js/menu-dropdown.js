/**
 /**
 * Menu and Dropdown functionality for Gyannetra website
 */

// Global function for onclick handlers - ESSENTIAL FOR RESPONSIVENESS
function toggleMobileMenu(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburgerMenu && navLinks) {
    hamburgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    navLinks.classList.toggle('show');
    
    const isOpen = navLinks.classList.contains('active');
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
    
    return false;
  }
}

// Make sure function is globally available
window.toggleMobileMenu = toggleMobileMenu;

document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburgerMenu && navLinks) {
    // Enhanced click handler
    hamburgerMenu.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMobileMenu();
    });
    
    // Close menu when clicking on nav links (but not dropdowns)
    navLinks.addEventListener('click', function(e) {
      if (e.target.classList.contains('nav-link') && !e.target.closest('.dropdown')) {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Dropdown menu enhancements
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    if (dropdownMenu) {
      // Show dropdown on hover (desktop)
      dropdown.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) {
          dropdownMenu.style.opacity = '1';
          dropdownMenu.style.visibility = 'visible';
          dropdownMenu.style.transform = 'translateY(0)';
        }
      });
      
      // Hide dropdown on mouse leave (desktop)
      dropdown.addEventListener('mouseleave', function() {
        if (window.innerWidth > 768) {
          dropdownMenu.style.opacity = '0';
          dropdownMenu.style.visibility = 'hidden';
          dropdownMenu.style.transform = 'translateY(-10px)';
        }
      });
      
      // Toggle dropdown on click (mobile)
      dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const isVisible = dropdownMenu.style.maxHeight && dropdownMenu.style.maxHeight !== '0px';
          
          // Close all other dropdowns
          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              const otherMenu = otherDropdown.querySelector('.dropdown-menu');
              if (otherMenu) {
                otherMenu.style.maxHeight = '0px';
                otherMenu.style.opacity = '0';
              }
            }
          });
          
          // Toggle current dropdown
          if (isVisible) {
            dropdownMenu.style.maxHeight = '0px';
            dropdownMenu.style.opacity = '0';
          } else {
            dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
            dropdownMenu.style.opacity = '1';
          }
        }
      });
    }
  });
});