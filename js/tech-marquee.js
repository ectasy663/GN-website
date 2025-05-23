// Tech Marquee Animation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const techMarqueeContents = document.querySelectorAll('.tech-marquee-content');
    const techItems = document.querySelectorAll('.tech-marquee-item');
    
    // Adjust animation speed for each marquee
    techMarqueeContents.forEach((marquee, index) => {
        const isReversed = marquee.classList.contains('tech-marquee-content-reversed');
        const marqueeItems = marquee.querySelectorAll('.tech-marquee-item');
        const itemCount = marqueeItems.length / 2; // Account for duplicated items
        
        // Set slightly different speeds for each marquee
        const baseSpeed = isReversed ? 65 : 60;
        const animationDuration = Math.max(30, Math.min(70, itemCount * 5)); // Between 30s and 70s
        marquee.style.animationDuration = `${baseSpeed + (index * 10)}s`;
    });
    
    // Add 3D tilt effect on mouse move for each tech icon
    techItems.forEach(item => {
        const iconContainer = item.querySelector('.tech-icon-container');
        
        if (iconContainer) {
            item.addEventListener('mousemove', function(e) {
                const rect = iconContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const tiltX = (centerX - x) / 10;
                const tiltY = (y - centerY) / 10;
                
                iconContainer.style.transform = `perspective(500px) rotateX(${tiltY}deg) rotateY(${-tiltX}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            item.addEventListener('mouseleave', function() {
                iconContainer.style.transform = '';
            });
        }
    });
    
    // Function to add pulse effect to random icons in a marquee
    function addPulseEffects() {
        // Get all tech marquees
        const marquees = document.querySelectorAll('.tech-marquee-container');
        
        marquees.forEach(marquee => {
            // Get all items in this marquee
            const marqueeItems = marquee.querySelectorAll('.tech-marquee-item');
            
            // Select 1-2 random items to pulse
            const numberOfPulses = Math.floor(Math.random() * 2) + 1;
            
            for (let i = 0; i < numberOfPulses; i++) {
                const randomIndex = Math.floor(Math.random() * marqueeItems.length);
                const randomItem = marqueeItems[randomIndex];
                const iconContainer = randomItem.querySelector('.tech-icon-container');
                
                if (iconContainer && !iconContainer.classList.contains('tech-pulse-highlight')) {
                    iconContainer.classList.add('tech-pulse-highlight');
                    
                    setTimeout(() => {
                        iconContainer.classList.remove('tech-pulse-highlight');
                    }, 2000);
                }
            }
        });
    }
    
    // Add subtle pulse effects periodically
    setInterval(addPulseEffects, 3000);
      // Add a parallax effect to create depth between the two marquees
    window.addEventListener('mousemove', function(e) {
        const containers = document.querySelectorAll('.tech-marquee-container');
        
        containers.forEach((container, index) => {
            const isReversed = container.classList.contains('tech-marquee-reversed');
            const depth = isReversed ? 25 : 15; // Reduced sensitivity due to full width
            const moveX = (e.clientX - window.innerWidth / 2) / depth;
            const moveY = (e.clientY - window.innerHeight / 2) / depth;
            
            // Limit the movement for a subtler effect with the full-width design
            const maxMove = 10;
            const limitedMoveX = Math.max(-maxMove, Math.min(maxMove, moveX));
            const limitedMoveY = Math.max(-maxMove, Math.min(maxMove, moveY));
            
            container.style.transform = `translate(${limitedMoveX}px, ${limitedMoveY}px)`;
        });
    });
    
    // Add entrance animation for each tech item
    const allMarquees = document.querySelectorAll('.tech-marquee-container');
    allMarquees.forEach((marquee, marqueeIndex) => {
        marquee.style.animationDelay = `${marqueeIndex * 0.2}s`;
    });
});
