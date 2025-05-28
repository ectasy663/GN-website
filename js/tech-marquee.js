// Tech Cards Animation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const techCardsContainer = document.querySelector('.tech-cards-container');
    const techCards = document.querySelectorAll('.tech-card');
    
    // No animation delay or dancing effects
    techCards.forEach((card) => {
        // Just add basic hover interaction
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });    
    // Add 3D tilt effect on mouse move for each tech card
    techCards.forEach(card => {
        const iconWrapper = card.querySelector('.tech-icon-wrapper');
        
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
            
            card.addEventListener('mouseleave', function() {
                iconWrapper.style.transform = '';
            });
        }
    });
    
    // Add a parallax effect to create depth in the tech cards container
    window.addEventListener('mousemove', function(e) {
        if (techCardsContainer) {
            const depth = 20;
            const moveX = (e.clientX - window.innerWidth / 2) / depth;
            const moveY = (e.clientY - window.innerHeight / 2) / depth;
            
            // Limit the movement for a subtler effect
            const maxMove = 5;
            const limitedMoveX = Math.max(-maxMove, Math.min(maxMove, moveX));
            const limitedMoveY = Math.max(-maxMove, Math.min(maxMove, moveY));
            
            techCardsContainer.style.transform = `translate(${limitedMoveX}px, ${limitedMoveY}px)`;
        }
    });
    
        // Add entrance animation for the tech cards container
    if (techCardsContainer) {
        techCardsContainer.style.opacity = '0';
        techCardsContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            techCardsContainer.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            techCardsContainer.style.opacity = '1';
            techCardsContainer.style.transform = 'translateY(0)';
        }, 200);
    }
});
