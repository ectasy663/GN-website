/**
 * Mobile navigation fix - ensures hamburger menu works properly on mobile devices
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get hamburger menu element
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  
  if (hamburgerMenu) {
    // Add additional click handler with logging
    hamburgerMenu.addEventListener('touchstart', function(e) {
      console.log('Hamburger touchstart triggered');
      // Prevent default touch behavior if needed
      e.preventDefault();
    }, { passive: false });
    
    // Log that the script has loaded
    console.log('Mobile navigation fix loaded');
    
    // Add visible indicator for debugging
    if (window.innerWidth <= 768) {
      hamburgerMenu.setAttribute('data-mobile-enhanced', 'true');
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth <= 768) {
        hamburgerMenu.style.display = 'flex';
      } else {
        hamburgerMenu.style.display = 'none';
      }
    });
  }
});
