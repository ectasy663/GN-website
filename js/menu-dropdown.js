// Fallback: Enhance dropdowns with fade/slide effect if not handled elsewhere
// (dropdown.js already handles logic, so this is for extra UI polish)

// Global function for onclick handlers - ESSENTIAL FOR RESPONSIVENESS
function toggleMobileMenu(event) {
  console.log('🍔 toggleMobileMenu called directly!');
  
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburgerMenu && navLinks) {
    console.log('🍔 Toggling menu state...');
    
    hamburgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    navLinks.classList.toggle('show');
    
    const isOpen = navLinks.classList.contains('active');
    console.log('🍔 Menu is now:', isOpen ? 'OPEN' : 'CLOSED');
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
    
    return false; // Prevent default action
  } else {
    console.error('❌ Hamburger menu or nav links not found!');
  }
}

// Make sure function is globally available
window.toggleMobileMenu = toggleMobileMenu;

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM loaded, initializing hamburger menu...');
  console.log('📱 Screen width:', window.innerWidth);
  console.log('📱 Is mobile:', window.innerWidth <= 768);
  
  // Hamburger menu functionality with enhanced error handling
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  
  console.log('🍔 Hamburger menu found:', !!hamburgerMenu);
  console.log('🔗 Nav links found:', !!navLinks);
  
  if (hamburgerMenu) {
    console.log('🍔 Hamburger menu element:', hamburgerMenu);
    console.log('🍔 Hamburger menu styles:', window.getComputedStyle(hamburgerMenu).display);
  }
  
  if (navLinks) {
    console.log('🔗 Nav links element:', navLinks);
    console.log('🔗 Nav links styles:', window.getComputedStyle(navLinks).display);
  }
  
  if (hamburgerMenu && navLinks) {hamburgerMenu.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event bubbling
      hamburgerMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
      navLinks.classList.toggle('show'); // Support both class names
      
      // Prevent body scrolling when menu is open
      if (navLinks.classList.contains('active') || navLinks.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      
      console.log('Hamburger menu clicked - active state:', hamburgerMenu.classList.contains('active')); // Debug
    });      // Close menu when clicking on nav links (but not dropdowns)
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
  
  // ADDITIONAL: Enhanced mobile dropdown functionality for Services and Industries
  function initializeMobileDropdowns() {
      const dropdowns = document.querySelectorAll('.nav-links .dropdown');
      
      dropdowns.forEach(dropdown => {
          const trigger = dropdown.querySelector('.nav-link');
          const menu = dropdown.querySelector('.dropdown-menu');
          
          if (trigger && menu) {
              // Add click handler for mobile dropdown toggle
              trigger.addEventListener('click', function(e) {
                  if (window.innerWidth <= 768) {
                      e.preventDefault();
                      e.stopPropagation();
                      
                      // Close other dropdowns first
                      dropdowns.forEach(otherDropdown => {
                          if (otherDropdown !== dropdown) {
                              otherDropdown.classList.remove('active');
                              const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                              if (otherMenu) {
                                  otherMenu.classList.remove('show');
                              }
                          }
                      });
                      
                      // Toggle current dropdown
                      dropdown.classList.toggle('active');
                      menu.classList.toggle('show');
                      
                      console.log('Mobile dropdown toggled:', dropdown.classList.contains('active'));
                  }
              });
              
              // Add visual feedback on touch
              trigger.addEventListener('touchstart', function() {
                  if (window.innerWidth <= 768) {
                      this.style.transform = 'scale(0.98)';
                  }
              });
              
              trigger.addEventListener('touchend', function() {
                  if (window.innerWidth <= 768) {
                      this.style.transform = '';
                  }
              });
          }
      });
  }
    // Initialize mobile dropdowns
  initializeMobileDropdowns();
  
  // FIXED: Consolidated hamburger menu logic - no duplicate event listeners
  if (hamburgerMenu && navLinks) {
    // Remove any existing click handlers to prevent conflicts
    hamburgerMenu.onclick = null;
    
    // Single, comprehensive click handler
    hamburgerMenu.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle hamburger and navigation states
      hamburgerMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
      navLinks.classList.toggle('show');
      
      const isMenuOpen = navLinks.classList.contains('active') || navLinks.classList.contains('show');
      
      // Handle body scroll
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
      
      // Close all dropdowns when hamburger menu closes
      if (!isMenuOpen) {
        const dropdowns = document.querySelectorAll('.nav-links .dropdown');
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
          const menu = dropdown.querySelector('.dropdown-menu');
          if (menu) {
            menu.classList.remove('show');
          }
        });
      }
        console.log('Hamburger menu clicked - active state:', isMenuOpen);
    });
  } else {
    console.warn('Hamburger menu or nav links not found! Retrying in 500ms...');
    // Backup initialization after a short delay
    setTimeout(function() {
      const retryHamburger = document.querySelector('.hamburger-menu');
      const retryNavLinks = document.querySelector('.nav-links');
      
      if (retryHamburger && retryNavLinks) {
        console.log('Retry successful - initializing hamburger menu...');
        retryHamburger.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          retryHamburger.classList.toggle('active');
          retryNavLinks.classList.toggle('active');
          retryNavLinks.classList.toggle('show');
          
          const isMenuOpen = retryNavLinks.classList.contains('active') || retryNavLinks.classList.contains('show');
          document.body.style.overflow = isMenuOpen ? 'hidden' : '';
          
          console.log('Retry hamburger clicked - active state:', isMenuOpen);
        });
      } else {
        console.error('Hamburger menu initialization failed even after retry!');
      }
    }, 500);
  }
  
  // ADDITIONAL: Direct fallback click handler for hamburger menu
  // This ensures the hamburger works even if other scripts interfere
  document.addEventListener('click', function(e) {
    if (e.target.closest('.hamburger-menu')) {
      e.preventDefault();
      e.stopPropagation();
      
      const hamburger = e.target.closest('.hamburger-menu');
      const nav = document.querySelector('.nav-links');
      
      if (hamburger && nav) {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        nav.classList.toggle('show');
        
        const isOpen = nav.classList.contains('active') || nav.classList.contains('show');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        
        console.log('Fallback hamburger handler triggered - menu open:', isOpen);
      }
    }
  });
  
  // Ensure hamburger lines are visible
  document.querySelectorAll('.hamburger-line').forEach(line => {
    line.style.display = 'block';
    line.style.opacity = '1';
  });
  
  // Add window resize handler to close dropdowns when switching to desktop
  window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
          const dropdowns = document.querySelectorAll('.nav-links .dropdown');
          dropdowns.forEach(dropdown => {
              dropdown.classList.remove('active');
              const menu = dropdown.querySelector('.dropdown-menu');
              if (menu) {
                  menu.classList.remove('show');
              }
          });
      }
  });
});