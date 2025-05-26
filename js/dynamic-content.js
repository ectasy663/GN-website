/**
 * Dynamic Content Loader
 * Handles lazy loading of content, interactive cards, and tabs
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Initialize interactive cards
    initInteractiveCards();
    
    // Initialize tabs if they exist
    initTabSystem();
    
    // Initialize accordion components
    initAccordion();
    
    // Initialize dynamic counters
    initCounters();
    
    // Initialize dynamic content filter
    initContentFilter();
});

// Lazy load images as they enter viewport
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Replace src with data-src
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        
                        // Add fade-in effect
                        img.classList.add('image-loaded');
                    }
                    
                    // Stop observing after loading
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });
        
        // Observe all lazy images
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// Interactive hover and click effects for cards
function initInteractiveCards() {
    const cards = document.querySelectorAll('.card, .service-card, .exp-item, .team-member');
    
    cards.forEach(card => {
        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate tilt based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (centerY - y) / 20;
            const tiltY = (x - centerX) / 20;
            
            // Apply 3D transform
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Add highlight effect to follow cursor
            const highlight = this.querySelector('.card-highlight') || document.createElement('div');
            if (!this.querySelector('.card-highlight')) {
                highlight.className = 'card-highlight';
                this.appendChild(highlight);
            }
            
            highlight.style.opacity = '1';
            highlight.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const highlight = this.querySelector('.card-highlight');
            if (highlight) {
                highlight.style.opacity = '0';
            }
        });
        
        // Click effect
        card.addEventListener('click', function() {
            this.classList.add('card-clicked');
            setTimeout(() => {
                this.classList.remove('card-clicked');
            }, 300);
        });
    });
}

// Tab system for content switching
function initTabSystem() {
    const tabContainers = document.querySelectorAll('.tab-container');
    
    tabContainers.forEach(container => {
        const tabsNav = container.querySelector('.tabs-nav');
        const tabsContent = container.querySelector('.tabs-content');
        
        if (!tabsNav || !tabsContent) return;
        
        const tabs = tabsNav.querySelectorAll('.tab');
        const tabPanels = tabsContent.querySelectorAll('.tab-panel');
        
        // Initialize first tab as active
        if (tabs.length > 0 && tabPanels.length > 0) {
            tabs[0].classList.add('active-tab');
            tabPanels[0].classList.add('active-panel');
        }
        
        // Add click handlers to tabs
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and panels
                tabs.forEach(t => t.classList.remove('active-tab'));
                tabPanels.forEach(panel => panel.classList.remove('active-panel'));
                
                // Add active class to current tab and panel
                this.classList.add('active-tab');
                if (tabPanels[index]) {
                    tabPanels[index].classList.add('active-panel');
                }
                
                // Add entrance animation for tab content
                if (tabPanels[index]) {
                    tabPanels[index].classList.add('panel-entering');
                    setTimeout(() => {
                        tabPanels[index].classList.remove('panel-entering');
                    }, 500);
                }
                
                // Show active tab indicator
                const indicator = tabsNav.querySelector('.tab-indicator') || document.createElement('div');
                if (!tabsNav.querySelector('.tab-indicator')) {
                    indicator.className = 'tab-indicator';
                    tabsNav.appendChild(indicator);
                }
                
                // Position indicator below active tab
                const tabRect = this.getBoundingClientRect();
                const navRect = tabsNav.getBoundingClientRect();
                indicator.style.width = `${tabRect.width}px`;
                indicator.style.left = `${tabRect.left - navRect.left}px`;
            });
        });
        
        // Trigger indicator positioning for first tab
        if (tabs[0]) {
            setTimeout(() => {
                tabs[0].click();
            }, 100);
        }
    });
}

// Accordion functionality for FAQ or content sections
function initAccordion() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion-item');
        
        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            if (!header || !content) return;
            
            // Set initial state
            content.style.maxHeight = '0px';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.3s ease';
            
            // Toggle accordion on click
            header.addEventListener('click', function() {
                // Check if this item is already open
                const isOpen = item.classList.contains('accordion-open');
                
                // Close all items
                items.forEach(otherItem => {
                    otherItem.classList.remove('accordion-open');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    if (otherContent) {
                        otherContent.style.maxHeight = '0px';
                    }
                });
                
                // Open this item if it wasn't already open
                if (!isOpen) {
                    item.classList.add('accordion-open');
                    content.style.maxHeight = `${content.scrollHeight}px`;
                }
                
                // Add indicator animation
                const indicator = header.querySelector('.accordion-indicator') || document.createElement('div');
                if (!header.querySelector('.accordion-indicator')) {
                    indicator.className = 'accordion-indicator';
                    indicator.innerHTML = '<span>+</span>';
                    header.appendChild(indicator);
                }
                
                // Update indicator
                indicator.innerHTML = item.classList.contains('accordion-open') ? '<span>−</span>' : '<span>+</span>';
            });
        });
        
        // Open first item by default if specified
        if (accordion.classList.contains('first-open') && items[0]) {
            setTimeout(() => {
                items[0].querySelector('.accordion-header').click();
            }, 100);
        }
    });
}

// Animated counters that increment when in view
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (!counters.length) return;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetValue = parseInt(counter.getAttribute('data-target'));
                const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                
                // Prevent multiple animations
                if (counter.classList.contains('counting')) return;
                counter.classList.add('counting');
                
                animateCounter(counter, targetValue, duration);
                
                // Stop observing after animation
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe all counters
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Counter animation function
    function animateCounter(counter, target, duration) {
        let startTime = null;
        const startValue = 0;
        
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = Math.floor(progress * (target - startValue) + startValue);
            
            counter.textContent = formatNumber(currentValue);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                counter.textContent = formatNumber(target);
                counter.classList.add('counter-complete');
            }
        }
        
        window.requestAnimationFrame(step);
    }
    
    // Format number with commas
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}

// Content filtering system for portfolios or galleries
function initContentFilter() {
    const filterContainers = document.querySelectorAll('.filter-container');
    
    filterContainers.forEach(container => {
        const filterButtons = container.querySelectorAll('.filter-button');
        const filterItems = container.querySelectorAll('.filter-item');
        
        if (!filterButtons.length || !filterItems.length) return;
        
        // Click handler for filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active-filter');
                });
                
                // Add active class to clicked button
                this.classList.add('active-filter');
                
                // Get filter category
                const filterCategory = this.getAttribute('data-filter');
                
                // Filter items
                filterItems.forEach(item => {
                    const itemCategories = item.getAttribute('data-categories');
                    
                    if (!itemCategories) return;
                    
                    // Check if item matches filter
                    if (filterCategory === 'all' || itemCategories.includes(filterCategory)) {
                        // Show item with animation
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        item.style.display = 'block';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        // Hide item with animation
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Set "All" filter as active by default
        const allFilterButton = container.querySelector('.filter-button[data-filter="all"]');
        if (allFilterButton) {
            allFilterButton.click();
        }
    });
}
