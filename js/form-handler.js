/**
 * Enhanced Contact Form Handler
 * Handles form validation, submission, and user feedback
 */

class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.querySelector('.btn-send-message');
        this.messageDiv = document.getElementById('form-message');
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.setupFormListeners();
        this.setupRealTimeValidation();
        this.setupAccessibility();
    }

    setupFormListeners() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Add input event listeners for real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', this.validateField.bind(this));
            input.addEventListener('input', this.clearFieldError.bind(this));
        });
    }

    setupRealTimeValidation() {
        // Email validation as user types
        const emailInput = document.getElementById('your-email');
        if (emailInput) {
            emailInput.addEventListener('input', (e) => {
                this.debounce(() => this.validateEmail(e.target), 500)();
            });
        }

        // Name validation
        const nameInput = document.getElementById('your-name');
        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                this.validateName(e.target);
            });
        }
    }

    setupAccessibility() {
        // Add ARIA labels and improve accessibility
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const label = this.form.querySelector(`label[for="${input.id}"]`);
            if (label) {
                input.setAttribute('aria-labelledby', label.id || `${input.id}-label`);
                if (!label.id) label.id = `${input.id}-label`;
            }
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        if (!this.validateForm()) {
            this.showMessage('Please fix the errors below before submitting.', 'error');
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.submitForm();
            this.showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.resetForm();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    async submitForm() {
        // Simulate API call - replace with actual submission logic
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 2000);
        });
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField({ target: input })) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const fieldGroup = field.closest('.form-group');
        
        // Clear previous validation state
        this.clearFieldError(e);

        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required.';
            isValid = false;
        }
        // Email validation
        else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            errorMessage = 'Please enter a valid email address.';
            isValid = false;
        }
        // Name validation
        else if (field.id === 'your-name' && value && value.length < 2) {
            errorMessage = 'Name must be at least 2 characters long.';
            isValid = false;
        }
        // Message validation
        else if (field.id === 'your-message' && value && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long.';
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(fieldGroup, errorMessage);
        } else if (value) {
            this.showFieldSuccess(fieldGroup);
        }

        return isValid;
    }

    validateEmail(emailField) {
        const value = emailField.value.trim();
        const fieldGroup = emailField.closest('.form-group');
        
        if (value && this.isValidEmail(value)) {
            this.showFieldSuccess(fieldGroup);
        } else if (value) {
            this.showFieldError(fieldGroup, 'Please enter a valid email address.');
        }
    }

    validateName(nameField) {
        const value = nameField.value.trim();
        const fieldGroup = nameField.closest('.form-group');
        
        if (value && value.length >= 2) {
            this.showFieldSuccess(fieldGroup);
        }
    }

    clearFieldError(e) {
        const fieldGroup = e.target.closest('.form-group');
        fieldGroup.classList.remove('error', 'success');
        
        // Remove any existing error message
        const existingError = fieldGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    showFieldError(fieldGroup, message) {
        fieldGroup.classList.add('error');
        fieldGroup.classList.remove('success');
        
        // Add error message
        let errorElement = fieldGroup.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            fieldGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    showFieldSuccess(fieldGroup) {
        fieldGroup.classList.add('success');
        fieldGroup.classList.remove('error');
        
        // Remove any existing error message
        const existingError = fieldGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showMessage(message, type) {
        this.messageDiv.textContent = message;
        this.messageDiv.className = `form-message ${type}`;
        this.messageDiv.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.messageDiv.style.display = 'none';
            }, 5000);
        }

        // Scroll to message
        this.messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    resetForm() {
        this.form.reset();
        
        // Clear all validation states
        const fieldGroups = this.form.querySelectorAll('.form-group');
        fieldGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorElement = group.querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Form Enhancement Utilities
class FormEnhancements {
    static addFloatingLabels() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label && input.type !== 'select') {
                group.classList.add('floating-label');
                
                // Move label after input for floating effect
                if (input.nextElementSibling !== label) {
                    input.parentNode.insertBefore(label, input.nextSibling);
                }
            }
        });
    }

    static addFormAnimations() {
        // Add staggered animation to form fields
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.animationDelay = `${index * 0.1}s`;
            group.classList.add('fade-in-up');
        });
    }

    static enhanceSelectBoxes() {
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            // Add custom styling hook
            select.addEventListener('change', (e) => {
                if (e.target.value) {
                    e.target.classList.add('has-value');
                } else {
                    e.target.classList.remove('has-value');
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main form handler
    new ContactFormHandler();
    
    // Add form enhancements
    FormEnhancements.addFloatingLabels();
    FormEnhancements.addFormAnimations();
    FormEnhancements.enhanceSelectBoxes();
});

// Additional CSS for error messages and animations
function injectFormStyles() {
    if (document.querySelector('#form-enhancement-styles')) return;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'form-enhancement-styles';
    styleElement.textContent = `
        .field-error {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            font-weight: 500;
            animation: shake 0.3s ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        .fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
            transform: translateY(20px);
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .form-group.has-value input,
        .form-group.has-value textarea {
            border-color: rgba(82, 238, 245, 0.6);
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Inject styles when DOM is ready
injectFormStyles();
