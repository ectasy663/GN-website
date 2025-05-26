/**
 * Hero Animation - Neural network visualization and interactive node effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize neural mesh canvas
    initNeuralMesh();
    
    // Initialize data nodes interaction
    initDataNodes();
    
    // Initialize morphing shapes animation
    initMorphingShapes();
    
    // Initialize data streams animation
    initDataStreams();
});

// Create neural mesh network visualization
function initNeuralMesh() {
    const canvas = document.querySelector('.mesh-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Neural network settings
    const nodeCount = 120;
    const nodes = [];
    const connections = [];
    const connectionDistance = 150;
    const nodeSize = 2;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * nodeSize + 1,
            color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`
        });
    }
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw connections
        connections.length = 0;
        
        for (let i = 0; i < nodes.length; i++) {
            const nodeA = nodes[i];
            
            for (let j = i + 1; j < nodes.length; j++) {
                const nodeB = nodes[j];
                
                const dx = nodeB.x - nodeA.x;
                const dy = nodeB.y - nodeA.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    connections.push({
                        x1: nodeA.x,
                        y1: nodeA.y,
                        x2: nodeB.x,
                        y2: nodeB.y,
                        opacity
                    });
                }
            }
        }
        
        // Draw connections
        for (const connection of connections) {
            ctx.beginPath();
            ctx.moveTo(connection.x1, connection.y1);
            ctx.lineTo(connection.x2, connection.y2);
            ctx.strokeStyle = `rgba(80, 200, 255, ${connection.opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
        
        // Draw and update nodes
        for (const node of nodes) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();
            
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Add mouse interaction
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Add attraction to mouse position for nearby nodes
        for (const node of nodes) {
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                node.x += dx * 0.02;
                node.y += dy * 0.02;
            }
        }
    });
}

// Initialize interactive data nodes
function initDataNodes() {
    const nodes = document.querySelectorAll('.data-node');
    
    nodes.forEach(node => {        // Add hover effects
        node.addEventListener('mouseenter', function() {
            // Highlight node
            this.classList.add('node-hover');
            
            // Create connecting lines to related nodes
            const tech = this.getAttribute('data-tech');
            const connectedTech = getRelatedTechnologies(tech);
            nodes.forEach(otherNode => {
                const otherTech = otherNode.getAttribute('data-tech');
                if (otherTech && connectedTech.includes(otherTech)) {
                    otherNode.classList.add('node-connected');
                }
            });
        });
        
        // Remove effects on mouse leave
        node.addEventListener('mouseleave', function() {
            // Remove highlight
            this.classList.remove('node-hover');
            
            // Remove connecting lines
            nodes.forEach(otherNode => {
                otherNode.classList.remove('node-connected');
            });
        });
        
        // Add click interaction
        node.addEventListener('click', function() {
            const tech = this.getAttribute('data-tech');
            if (!tech) return;
            
            // Get corresponding URL for the technology
            const url = getTechnologyPageUrl(tech);
            if (url) {
                // Create click pulse effect
                const pulse = document.createElement('div');
                pulse.className = 'node-pulse';
                this.appendChild(pulse);
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = url;
                }, 300);
            }
        });
    });
    
    // Add pulsing animation to core nodes
    const coreNodes = document.querySelectorAll('.node-core');
    coreNodes.forEach(node => {
        setInterval(() => {
            node.classList.add('core-pulse-active');
            setTimeout(() => {
                node.classList.remove('core-pulse-active');
            }, 1500);
        }, 3000 + Math.random() * 2000); // Randomize timing for natural effect
    });
}

// Map technology names to related technologies
function getRelatedTechnologies(tech) {
    const techMap = {
        'Machine Learning': ['Data Analytics', 'Generative AI', 'Agentic AI'],
        'Generative AI': ['Machine Learning', 'Data Analytics', 'Media & Entertainment'],
        'Data Analytics': ['Machine Learning', 'Finance', 'Retail'],
        'Automation': ['Agentic AI', 'Manufacturing', 'Healthcare'],
        'Finance': ['Data Analytics', 'Machine Learning'],
        'Healthcare': ['Machine Learning', 'Automation'],
        'Retail': ['Data Analytics', 'Machine Learning'],
        'Manufacturing': ['Automation', 'Data Analytics'],
        'Agentic AI': ['Machine Learning', 'Automation'],
        'Marketing': ['Data Analytics', 'Generative AI'],
        'Media & Entertainment': ['Generative AI', 'Data Analytics'],
        'Travel': ['Data Analytics', 'Automation'],
        'Education': ['Generative AI', 'Machine Learning'],
        'Technology': ['Machine Learning', 'Agentic AI', 'Data Analytics', 'Automation']
    };
    
    return techMap[tech] || [];
}

// Map technology names to page URLs
function getTechnologyPageUrl(tech) {
    const urlMap = {
        'Machine Learning': 'Services/machine-learning.html',
        'Generative AI': 'Services/generative-ai.html',
        'Data Analytics': 'Services/data-analysis.html',
        'Automation': 'Services/automation-flows.html',
        'Agentic AI': 'Services/agentic-ai.html',
        'Finance': 'Industries/finance.html',
        'Healthcare': 'Industries/healthcare.html',
        'Retail': 'Industries/retail.html',
        'Manufacturing': 'Industries/manufacturing.html',
        'Marketing': 'Industries/marketing.html',
        'Media & Entertainment': 'Industries/media-entertainment.html',
        'Travel': 'Industries/travel.html',
        'Education': 'Education/workshops.html',
        'Technology': 'about.html'
    };
    
    return urlMap[tech] || null;
}

// Initialize morphing geometric shapes
function initMorphingShapes() {
    const morphShapes = document.querySelectorAll('.morph-shape');
    
    morphShapes.forEach(shape => {
        // Random initial properties
        const size = Math.random() * 100 + 50;
        const opacity = Math.random() * 0.15 + 0.05;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        
        // Set initial style
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.opacity = opacity;
        shape.style.transform = `rotate(${rotation}deg)`;
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `${delay}s`;
    });
}

// Initialize data streams animation
function initDataStreams() {
    const streams = document.querySelectorAll('.stream, .stream-horizontal, .stream-diagonal');
    
    streams.forEach(stream => {
        // Random animation properties
        const duration = Math.random() * 8 + 4;
        const delay = Math.random() * 3;
        
        // Apply animation with random timing
        stream.style.animationDuration = `${duration}s`;
        stream.style.animationDelay = `${delay}s`;
    });
}
