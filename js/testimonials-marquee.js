// Testimonials Animation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    console.log('Testimonials marquee script loaded');
    
    const testimonialsContainer = document.querySelector('.testimonials-track-container');
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    console.log('Testimonial cards found:', testimonialCards.length);
    console.log('Testimonials track found:', testimonialsTrack);
    
    // Add hover pause functionality for individual testimonial cards
    testimonialCards.forEach((card, index) => {
        console.log(`Setting up testimonial card ${index}`);
          // Pause animation when hovering over individual cards
        card.addEventListener('mouseenter', function(e) {
            console.log('Testimonial card hover detected');
            e.stopPropagation(); // Prevent event bubbling
            if (testimonialsTrack) {
                testimonialsTrack.classList.add('paused');
                console.log('Testimonials animation paused via CSS class');
            }
        });
        
        card.addEventListener('mouseleave', function(e) {
            console.log('Testimonial card hover ended');
            e.stopPropagation(); // Prevent event bubbling
            if (testimonialsTrack) {
                testimonialsTrack.classList.remove('paused');
                console.log('Testimonials animation resumed via CSS class');
            }
        });
    });
      // Also pause when hovering over the container
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', function() {
            if (testimonialsTrack) {
                testimonialsTrack.classList.add('paused');
            }
        });
        
        testimonialsContainer.addEventListener('mouseleave', function() {
            if (testimonialsTrack) {
                testimonialsTrack.classList.remove('paused');
            }
        });
    }
    
    // Add entrance animation for the testimonials container (opacity only)
    if (testimonialsContainer) {
        testimonialsContainer.style.opacity = '0';
        
        setTimeout(() => {
            testimonialsContainer.style.transition = 'opacity 0.8s ease-out';
            testimonialsContainer.style.opacity = '1';
        }, 200);
    }
});
