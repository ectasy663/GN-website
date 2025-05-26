/**
 * Form validation and submission handler
 * Provides interactive form experiences with validation and feedback
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all forms on the page
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        initFormValidation(form);
    });
    
    // Contact form special handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        initContactForm(contactForm);
    }
    
    // Newsletter form special handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        initNewsletterForm(newsletterForm);
    }
});

// Initialize form validation
function initFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Add validation classes and event listeners
    inputs.forEach(input => {
        // Skip submit buttons
        if (input.type === 'submit') return;
        
        // Create validation message element
        const validationMessage = document.createElement('div');
        validationMessage.className = 'validation-message';
        input.parentNode.appendChild(validationMessage);
        
        // Add input event listeners
        input.addEventListener('blur', function() {
            validateInput(input);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling on input
            input.classList.remove('input-error');
            validationMessage.textContent = '';
        });
        
        // Add floating label effect for text inputs
        if (['text', 'email', 'tel', 'password', 'textarea'].includes(input.type)) {
            const label = document.querySelector(`label[for="${input.id}"]`);
            
            if (label) {
                // Position the label over the input initially
                label.classList.add('floating-label');
                
                // Move label up when input is focused or has content
                input.addEventListener('focus', function() {
                    label.classList.add('label-active');
                });
                
                input.addEventListener('blur', function() {
                    if (!input.value) {
                        label.classList.remove('label-active');
                    }
                });
                
                // Check initial state
                if (input.value) {
                    label.classList.add('label-active');
                }
            }
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all inputs
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        // If form is valid, proceed with submission
        if (isValid) {
            submitForm(form);
        }
    });
}

// Validate individual input
function validateInput(input) {
    const validationMessage = input.parentNode.querySelector('.validation-message');
    let isValid = true;
    let message = '';
    
    // Required field validation
    if (input.required && !input.value.trim()) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    if (input.type === 'email' && input.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (input.type === 'tel' && input.value.trim()) {
        const phonePattern = /^[\d\s\+\-\(\)]{7,20}$/;
        if (!phonePattern.test(input.value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
    }
    
    // Custom validation based on data attributes
    if (input.dataset.minLength && input.value.length < parseInt(input.dataset.minLength)) {
        isValid = false;
        message = `Minimum length is ${input.dataset.minLength} characters`;
    }
    
    // Update UI based on validation result
    if (!isValid) {
        input.classList.add('input-error');
        if (validationMessage) {
            validationMessage.textContent = message;
            validationMessage.classList.add('error-message');
        }
    } else {
        input.classList.remove('input-error');
        if (validationMessage) {
            validationMessage.textContent = '';
            validationMessage.classList.remove('error-message');
        }
    }
    
    return isValid;
}

// Submit form with animation
function submitForm(form) {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'form-loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Submitting...</p>
    `;
    form.appendChild(loadingOverlay);
    
    // Simulate form submission (replace with actual AJAX submission)
    setTimeout(() => {
        loadingOverlay.innerHTML = `
            <div class="success-icon">✓</div>
            <p>Thank you! We'll be in touch soon.</p>
        `;
        loadingOverlay.classList.add('submission-success');
        
        // Reset form after success
        setTimeout(() => {
            form.reset();
            form.removeChild(loadingOverlay);
            
            // Reset all floating labels
            const labels = form.querySelectorAll('.floating-label');
            labels.forEach(label => {
                label.classList.remove('label-active');
            });
        }, 3000);
    }, 1500);
}

// Special handling for contact form
function initContactForm(form) {
    // Add animation for form sections
    const formSections = form.querySelectorAll('.form-section');
    if (formSections.length > 1) {
        // Create navigation buttons
        const navigation = document.createElement('div');
        navigation.className = 'form-navigation';
        
        let currentSection = 0;
        
        // Initially hide all sections except the first
        formSections.forEach((section, index) => {
            if (index > 0) {
                section.classList.add('hidden-section');
            }
        });
        
        // Next button functionality
        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'btn btn-secondary next-section';
        nextBtn.textContent = 'Next';
        nextBtn.addEventListener('click', () => {
            // Validate current section before proceeding
            const currentInputs = formSections[currentSection].querySelectorAll('input, textarea, select');
            let sectionIsValid = true;
            
            currentInputs.forEach(input => {
                if (!validateInput(input)) {
                    sectionIsValid = false;
                }
            });
            
            if (sectionIsValid && currentSection < formSections.length - 1) {
                formSections[currentSection].classList.add('hidden-section');
                formSections[currentSection].classList.add('section-left');
                currentSection++;
                formSections[currentSection].classList.remove('hidden-section');
                
                updateNavigationState();
            }
        });
        
        // Previous button functionality
        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'btn btn-outline prev-section';
        prevBtn.textContent = 'Previous';
        prevBtn.style.display = 'none';
        prevBtn.addEventListener('click', () => {
            if (currentSection > 0) {
                formSections[currentSection].classList.add('hidden-section');
                currentSection--;
                formSections[currentSection].classList.remove('hidden-section');
                formSections[currentSection].classList.remove('section-left');
                
                updateNavigationState();
            }
        });
        
        // Add navigation to form
        navigation.appendChild(prevBtn);
        navigation.appendChild(nextBtn);
        form.appendChild(navigation);
        
        // Update navigation buttons state
        function updateNavigationState() {
            prevBtn.style.display = currentSection > 0 ? 'inline-block' : 'none';
            nextBtn.textContent = currentSection === formSections.length - 1 ? 'Submit' : 'Next';
            
            // Replace next button with submit on last section
            if (currentSection === formSections.length - 1) {
                nextBtn.classList.add('submit-form');
                nextBtn.addEventListener('click', () => {
                    form.dispatchEvent(new Event('submit'));
                });
            } else {
                nextBtn.classList.remove('submit-form');
            }
        }
    }
}

// Newsletter subscription form handling
function initNewsletterForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        if (!emailInput) return;
        
        // Validate email
        if (!validateInput(emailInput)) return;
        
        // Create animated check mark for subscription
        const subscribeBtn = form.querySelector('button[type="submit"]');
        if (subscribeBtn) {
            subscribeBtn.innerHTML = '<div class="subscribe-loader"></div>';
            subscribeBtn.disabled = true;
            
            setTimeout(() => {
                subscribeBtn.innerHTML = '<span class="subscribe-check">✓</span>';
                subscribeBtn.classList.add('subscribed');
                
                // Display thank you message
                const thankYou = document.createElement('div');
                thankYou.className = 'subscription-thanks';
                thankYou.textContent = 'Thank you for subscribing!';
                form.appendChild(thankYou);
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    subscribeBtn.innerHTML = 'Subscribe';
                    subscribeBtn.disabled = false;
                    subscribeBtn.classList.remove('subscribed');
                    
                    if (form.contains(thankYou)) {
                        form.removeChild(thankYou);
                    }
                }, 3000);
            }, 1500);
        }
    });
}
