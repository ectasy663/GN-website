/**
 * Page-specific animations and effects for Gyannetra Website
 * Handles unique interactions for different sections and pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Detect current page
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    // Initialize common elements
    initCommonElements();
    
    // Initialize page-specific effects
    switch (pageName) {
        case 'index.html':
            initHomePage();
            break;
        case 'about.html':
            initAboutPage();
            break;
        case 'contact.html':
            initContactPage();
            break;
        default:
            // Check if it's a service page
            if (currentPath.includes('/Services/')) {
                initServicePage();
            }
            // Check if it's an industry page
            else if (currentPath.includes('/Industries/')) {
                initIndustryPage();
            }
            // Check if it's an education page
            else if (currentPath.includes('/Education/')) {
                initEducationPage();
            }
    }
});

// Initialize elements common to all pages
function initCommonElements() {
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize footer animations
    initFooterAnimations();
    
    // Initialize section entrance animations
    initSectionAnimations();
}

// Header animation on scroll
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Add shadow and background when scrolling down
        if (scrollY > 20) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Hide header when scrolling down quickly, show when scrolling up
        if (scrollY > lastScrollY + 50) {
            header.classList.add('header-hidden');
        } else if (scrollY < lastScrollY - 10) {
            header.classList.remove('header-hidden');
        }
        
        lastScrollY = scrollY;
    });
}

// Homepage specific animations
function initHomePage() {
    // Initialize expertise item animations
    initExpertiseItems();
    
    // Initialize tech section parallax
    initTechParallax();
}

// Expertise items hover and click effects
function initExpertiseItems() {
    const expItems = document.querySelectorAll('.exp-item');
    
    expItems.forEach(item => {
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.classList.add('exp-hover');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('exp-hover');
        });
        
        // Add click animation
        item.addEventListener('click', function() {
            this.classList.add('exp-click');
            
            setTimeout(() => {
                this.classList.remove('exp-click');
            }, 300);
        });
    });
    
    // Add staggered entrance animation
    expItems.forEach((item, index) => {
        // Set staggered animation delay
        item.style.animationDelay = `${index * 0.15}s`;
        
        // Add animation class
        item.classList.add('animate-entrance');
    });
}

// Tech section parallax effect
function initTechParallax() {
    const techSection = document.getElementById('technologies');
    if (!techSection) return;
    
    window.addEventListener('scroll', () => {
        // Get section position
        const rect = techSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Check if section is in viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
            // Calculate percentage scrolled through the section
            const scrollPercentage = 1 - Math.max(0, Math.min(1, rect.bottom / (rect.height + viewportHeight)));
            
            // Apply parallax effect to tech icons
            const techItems = document.querySelectorAll('.tech-icon-container');
            techItems.forEach((item, index) => {
                const offsetFactor = (index % 3 - 1) * 20; // Different offset for each item
                const translateY = scrollPercentage * offsetFactor;
                item.style.transform = `translateY(${translateY}px)`;
            });
        }
    });
}

// About page specific animations
function initAboutPage() {
    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    if (teamMembers.length > 0) {
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', function() {
                this.classList.add('member-hover');
            });
            
            member.addEventListener('mouseleave', function() {
                this.classList.remove('member-hover');
            });
        });
    }
}

// Contact page specific functionality (animations removed)
function initContactPage() {
    // Basic form input handling without animations
    const formInputs = document.querySelectorAll('input, textarea');
    if (formInputs.length > 0) {
        formInputs.forEach(input => {
            // Add simplified focus effect (keep functionality but remove animations)
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('input-focused');
                }
            });
            
            // Check for pre-filled inputs (functionality preserved)
            if (input.value) {
                input.parentElement.classList.add('input-focused');
            }
        });
    }
}

// Service page specific animations
function initServicePage() {
    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach((card, index) => {
            // Add staggered animation
            card.style.animationDelay = `${index * 0.15}s`;
            card.classList.add('animate-slide-up');
        });
    }
}

// Industry page specific animations
function initIndustryPage() {
    // Case study hover effects
    const caseStudies = document.querySelectorAll('.case-study');
    if (caseStudies.length > 0) {
        caseStudies.forEach(study => {
            study.addEventListener('mouseenter', function() {
                this.classList.add('case-hover');
            });
            
            study.addEventListener('mouseleave', function() {
                this.classList.remove('case-hover');
            });
        });
    }
}

// Education page specific animations
function initEducationPage() {
    // Course card effects
    const courseCards = document.querySelectorAll('.course-card');
    if (courseCards.length > 0) {
        courseCards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('card-expanded');
            });
        });
    }
}

// Section entrance animations
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Animate children with delay
                const children = entry.target.querySelectorAll('.animate-on-visible');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('element-visible');
                });
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('section-hidden');
    });
}

// Footer animations
function initFooterAnimations() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    
    // Create intersection observer for footer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add('footer-visible');
                
                // Staggered animation for footer columns
                const columns = footer.querySelectorAll('.footer-col');
                columns.forEach((col, index) => {
                    col.style.animationDelay = `${index * 0.15}s`;
                    col.classList.add('col-visible');
                });
            }
        });
    }, {
        threshold: 0.2
    });
    
    observer.observe(footer);
} 