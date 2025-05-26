/**
 * Main.js - Core interaction and animation functionality for Gyannetra website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initScrollAnimations();
    initParallaxEffects();
    initSectionTransitions();
    initCursorEffects();
    
    // Remove page loader when everything is ready
    setTimeout(() => {
        const body = document.querySelector('body');
        if (body) body.classList.add('loaded');
    }, 300);
});

// Animate elements when they enter viewport
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.exp-item, .section-heading, .hero-content, .btn-primary');
    
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
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
        // Add base animation class
        element.classList.add('animate-on-scroll');
    });
}

// Parallax background effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.atmospheric-bg, .light-effect-top, .light-effect-bottom');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach((element, index) => {
            // Different parallax speeds based on element
            const speed = index * 0.1 + 0.1;
            element.style.transform = `translateY(${scrollY * speed}px)`;
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
    const interactiveElements = document.querySelectorAll('a, button, .data-node, .tech-marquee-item');
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