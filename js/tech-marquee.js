// Tech Cards Animation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tech marquee script loaded');
    
    const techCardsContainer = document.querySelector('.tech-cards-container');
    const techCardsTrack = document.querySelector('.tech-cards-track');
    const techCards = document.querySelectorAll('.tech-card');
    
    console.log('Tech cards found:', techCards.length);
    console.log('Tech track found:', techCardsTrack);
    
    // Add comprehensive hover functionality for individual tech cards
    techCards.forEach((card, index) => {
        console.log(`Setting up card ${index}`);
        const iconWrapper = card.querySelector('.tech-icon-wrapper');
          // Mouse enter - pause animation and lift card
        card.addEventListener('mouseenter', function(e) {
            console.log('Tech card hover detected');
            e.stopPropagation(); // Prevent event bubbling
            this.style.transform = 'translateY(-10px)';
            if (techCardsTrack) {
                techCardsTrack.classList.add('paused');
                console.log('Tech animation paused via CSS class');
            }
        });
        
        // Mouse leave - resume animation and reset card
        card.addEventListener('mouseleave', function(e) {
            console.log('Tech card hover ended');
            e.stopPropagation(); // Prevent event bubbling
            this.style.transform = '';
            if (techCardsTrack) {
                techCardsTrack.classList.remove('paused');
                console.log('Tech animation resumed via CSS class');
            }
            // Reset icon wrapper transform when leaving
            if (iconWrapper) {
                iconWrapper.style.transform = '';
            }
        });
        
        // Mouse move - 3D tilt effect (only if icon wrapper exists)
        if (iconWrapper) {
            card.addEventListener('mousemove', function(e) {
                const rect = iconWrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const tiltX = (centerX - x) / 10;
                const tiltY = (y - centerY) / 10;
                
                iconWrapper.style.transform = `perspective(500px) rotateX(${tiltY}deg) rotateY(${-tiltX}deg) scale3d(1.1, 1.1, 1.1)`;
            });
        }
    });
      // Add entrance animation for the tech cards container (opacity only)
    if (techCardsContainer) {
        techCardsContainer.style.opacity = '0';
        
        setTimeout(() => {
            techCardsContainer.style.transition = 'opacity 0.8s ease-out';
            techCardsContainer.style.opacity = '1';
        }, 200);
    }
});
