// Typewriter effect for hero section
class TypewriterEffect {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.colors = options.colors || ['#52eef5']; // Default color or array of colors
        this.speed = options.speed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseBetweenWords = options.pauseBetweenWords || 2000;
        this.pauseBeforeDelete = options.pauseBeforeDelete || 1500;
        this.currentWordIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.cursor = document.querySelector('.cursor');
        
        this.start();
    }
    
    start() {
        this.type();
    }
    
    type() {
        const currentWord = this.words[this.currentWordIndex];
        const currentColor = this.colors[this.currentWordIndex % this.colors.length]; // Cycle through colors
        
        if (this.isDeleting) {
            // Remove character
            this.currentText = this.currentText.substring(0, this.currentText.length - 1);
        } else {
            // Add character
            this.currentText = currentWord.substring(0, this.currentText.length + 1);
        }
        
        this.element.textContent = this.currentText;
        this.element.style.color = currentColor; // Apply current color
        
        let delay = this.speed;
        
        if (this.isDeleting) {
            delay = this.deleteSpeed;
        }
        
        // If word is complete
        if (!this.isDeleting && this.currentText === currentWord) {
            this.currentText = this.currentText + "\u00A0"; // Add one non-breaking space to internal text state
            this.element.textContent = this.currentText; // Update display to show non-breaking space during pause
            delay = this.pauseBeforeDelete;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            delay = this.pauseBetweenWords;
        }
        
        setTimeout(() => this.type(), delay);
    }
}

// Initialize typewriter effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        const services = [
            'AI Strategy & Roadmaps',
            'Custom LLM Solutions',
            'AI Automation & Workflows', 
            'Data-Driven Business Intelligence',
            'Computer Vision Systems',
            'NLP & Chatbot Integrations',
            'AI for EdTech & Healthcare',
            'Predictive Analytics Tools'
        ];        // Define an array of colors for the typewriter text
        const textColors = [
            '#00FFFF', // 1. Electric Cyan
            '#39FF14', // 2. Neon Green
            '#FFD700', // 3. Soft Amber/Gold
            '#F5F5F5', // 4. Off-White
            '#D8B9FF', // 5. Light Lavender
            '#87CEEB', // 6. Sky Blue
            '#FF00FF', // 7. Magenta Pink
            '#C0C0C0'  // 8. Silver/Grey White
        ];
        
        new TypewriterEffect(typewriterElement, services, {
            speed: 80,
            deleteSpeed: 40,
            pauseBetweenWords: 500,
            pauseBeforeDelete: 2000,
            colors: textColors // Pass the colors array to the constructor
        });
    }
});
