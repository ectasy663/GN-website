/**
 * GN Mobile Navigation - Isolated JavaScript
 * Fully functional mobile hamburger menu with dropdown support
 */
(function() {
  'use strict';

  // Cache DOM elements
  let gnMobileElements = null;  // Initialize mobile navigation
  function initGNMobileNav() {
    // Get DOM elements
    gnMobileElements = {
      hamburgerBtn: document.querySelector('.gn-mobile-hamburger__button'),
      overlay: document.querySelector('.gn-mobile-nav__overlay'),
      closeBtn: document.querySelector('.gn-mobile-nav__close'),
      dropdownToggles: document.querySelectorAll('.gn-mobile-nav__dropdown-toggle'),
      sublinks: document.querySelectorAll('.gn-mobile-nav__sublink'),
      body: document.body
    };

    // Check if required elements exist
    if (!gnMobileElements.hamburgerBtn || !gnMobileElements.overlay) {
      console.warn('GN Mobile Nav: Required elements not found');
      return;
    }

    // Bind events
    bindGNMobileNavEvents();
  }

  // Bind all mobile navigation events
  function bindGNMobileNavEvents() {
    // Hamburger button click
    gnMobileElements.hamburgerBtn.addEventListener('click', toggleGNMobileNav);

    // Close button click
    if (gnMobileElements.closeBtn) {
      gnMobileElements.closeBtn.addEventListener('click', closeGNMobileNav);
    }

    // Overlay click to close (clicking outside content)
    gnMobileElements.overlay.addEventListener('click', function(e) {
      if (e.target === gnMobileElements.overlay) {
        closeGNMobileNav();
      }
    });

    // Dropdown toggle functionality
    gnMobileElements.dropdownToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleGNMobileDropdown(this);
      });
    });

    // Close menu when clicking on sublinks
    gnMobileElements.sublinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeGNMobileNav();
      });
    });

    // Escape key to close menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && gnMobileElements.overlay.classList.contains('gn-mobile-nav--active')) {
        closeGNMobileNav();
      }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && gnMobileElements.overlay.classList.contains('gn-mobile-nav--active')) {
        closeGNMobileNav();
      }
    });
  }  // Toggle mobile navigation
  function toggleGNMobileNav(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const isActive = gnMobileElements.overlay.classList.contains('gn-mobile-nav--active');
    
    if (isActive) {
      closeGNMobileNav();
    } else {
      openGNMobileNav();
    }
  }

  // Open mobile navigation
  function openGNMobileNav() {
    gnMobileElements.hamburgerBtn.classList.add('gn-mobile-hamburger--active');
    gnMobileElements.overlay.classList.add('gn-mobile-nav--active');
    gnMobileElements.body.classList.add('gn-mobile-nav--no-scroll');

    // Set focus to close button for accessibility
    setTimeout(function() {
      if (gnMobileElements.closeBtn) {
        gnMobileElements.closeBtn.focus();
      }
    }, 100);
  }

  // Close mobile navigation
  function closeGNMobileNav() {
    gnMobileElements.hamburgerBtn.classList.remove('gn-mobile-hamburger--active');
    gnMobileElements.overlay.classList.remove('gn-mobile-nav--active');
    gnMobileElements.body.classList.remove('gn-mobile-nav--no-scroll');

    // Close all open dropdowns
    const expandedDropdowns = document.querySelectorAll('.gn-mobile-nav__item--dropdown.gn-mobile-nav--expanded');
    expandedDropdowns.forEach(function(dropdown) {
      dropdown.classList.remove('gn-mobile-nav--expanded');
      const toggle = dropdown.querySelector('.gn-mobile-nav__dropdown-toggle');
      if (toggle) {
        toggle.classList.remove('gn-mobile-nav--expanded');
      }
    });

    // Return focus to hamburger button
    setTimeout(function() {
      gnMobileElements.hamburgerBtn.focus();
    }, 100);
  }

  // Toggle dropdown within mobile navigation
  function toggleGNMobileDropdown(toggleElement) {
    const parentItem = toggleElement.closest('.gn-mobile-nav__item--dropdown');
    const isExpanded = parentItem.classList.contains('gn-mobile-nav--expanded');

    // Close all other dropdowns first
    const allDropdowns = document.querySelectorAll('.gn-mobile-nav__item--dropdown');
    allDropdowns.forEach(function(dropdown) {
      if (dropdown !== parentItem) {
        dropdown.classList.remove('gn-mobile-nav--expanded');
        const otherToggle = dropdown.querySelector('.gn-mobile-nav__dropdown-toggle');
        if (otherToggle) {
          otherToggle.classList.remove('gn-mobile-nav--expanded');
        }
      }
    });

    // Toggle current dropdown
    if (isExpanded) {
      parentItem.classList.remove('gn-mobile-nav--expanded');
      toggleElement.classList.remove('gn-mobile-nav--expanded');
    } else {
      parentItem.classList.add('gn-mobile-nav--expanded');
      toggleElement.classList.add('gn-mobile-nav--expanded');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGNMobileNav);
  } else {
    initGNMobileNav();
  }

  // Expose functions globally for debugging (optional)
  window.GNMobileNav = {
    open: openGNMobileNav,
    close: closeGNMobileNav,
    toggle: toggleGNMobileNav
  };

})();
