/**
 * Main.js - Core interaction and animation functionality for Gyannetra website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initScrollAnimations();
    initParallaxEffects();
    initSectionTransitions();
    initCursorEffects();
    initScrollEffects();
    
    // Remove page loader when everything is ready
    setTimeout(() => {
        const body = document.querySelector('body');
        if (body) body.classList.add('loaded');
    }, 300);
});

// Initialize scroll effects for navbar
function initScrollEffects() {
    const header = document.querySelector('.site-header');
    
    if (!header) return;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial check
    handleScroll();
}

// Animate elements when they enter viewport
function initScrollAnimations() {
    // Exclude hero content from scroll animations to prevent layout shifts
    const animatedElements = document.querySelectorAll('.exp-item, .section-heading, .btn-primary:not(#hero .btn-primary)');
    
    // Ensure hero content is always visible and stable
    const heroContent = document.querySelector('#hero .hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.visibility = 'visible';
        heroContent.style.transform = 'none';
        heroContent.style.textAlign = 'center';
        heroContent.style.marginLeft = 'auto';
        heroContent.style.marginRight = 'auto';
        heroContent.classList.add('animated'); // Mark as already animated
        
        // Force center alignment for all hero content children
        const heroChildren = heroContent.querySelectorAll('h1, p, .btn-primary');
        heroChildren.forEach(child => {
            child.style.textAlign = 'center';
            child.style.marginLeft = 'auto';
            child.style.marginRight = 'auto';
            child.style.transform = 'none';
            child.style.animation = 'none';
        });
    }
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe all animated elements (excluding hero content)
    animatedElements.forEach(element => {
        observer.observe(element);
        // Add base animation class
        element.classList.add('animate-on-scroll');
    });
}

// Parallax background effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.atmospheric-bg, .light-effect-top, .light-effect-bottom');
    const heroSection = document.querySelector('#hero');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Get hero section boundaries
        const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
        const heroTop = heroSection ? heroSection.offsetTop : 0;
        const heroBottom = heroSection ? heroTop + heroSection.offsetHeight : 0;
        
        parallaxElements.forEach((element, index) => {
            // Check if we're in the hero section area
            const isInHeroArea = scrollY >= heroTop - window.innerHeight && scrollY <= heroBottom;
            
            if (isInHeroArea) {
                // Make background static in hero area - no parallax movement
                element.style.transform = 'translateY(0px)';
            } else {
                // Apply parallax effects outside hero area
                const speed = index * 0.1 + 0.1;
                // Adjust the parallax calculation to account for hero section offset
                const adjustedScrollY = scrollY > heroBottom ? scrollY - heroBottom + heroTop : scrollY;
                element.style.transform = `translateY(${adjustedScrollY * speed}px)`;
            }
        });
    });
}

// Smooth section transitions
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.classList.add('transition-ready');
    });
}

// Custom cursor effects for interactive elements
function initCursorEffects() {
    const interactiveElements = document.querySelectorAll('a, button, .data-node, .tech-card');
    const body = document.body;
    
    // Create custom cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    body.appendChild(cursorDot);
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Hover effects
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });
}

// Watch for page visibility to optimize performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.body.classList.add('page-hidden');
    } else {
        document.body.classList.remove('page-hidden');
    }
});

// Add smooth scrolling to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Add animation class
            targetElement.classList.add('section-highlighted');
            
            // Smooth scroll
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Remove class after animation
            setTimeout(() => {
                targetElement.classList.remove('section-highlighted');
            }, 2000);
        }
    });
}); 