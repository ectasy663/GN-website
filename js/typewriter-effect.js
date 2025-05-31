// Typewriter effect for hero section
class TypewriterEffect {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
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
        
        if (this.isDeleting) {
            // Remove character
            this.currentText = currentWord.substring(0, this.currentText.length - 1);
        } else {
            // Add character
            this.currentText = currentWord.substring(0, this.currentText.length + 1);
        }
        
        this.element.textContent = this.currentText;
        
        let delay = this.speed;
        
        if (this.isDeleting) {
            delay = this.deleteSpeed;
        }
        
        // If word is complete
        if (!this.isDeleting && this.currentText === currentWord) {
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
        ];
        
        new TypewriterEffect(typewriterElement, services, {
            speed: 80,
            deleteSpeed: 40,
            pauseBetweenWords: 500,
            pauseBeforeDelete: 2000
        });
    }
});
