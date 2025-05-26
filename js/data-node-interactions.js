/**
 * Enhanced Unified Neural Network Animation and Data Node Interactive Effects
 * This file handles both the canvas background animation and data node interactions
 * with advanced interactive elements and dynamic visual effects
 */

// Neural Network Canvas Animation Class
class NeuralNetworkAnimation {
  constructor() {
    this.canvas = document.querySelector('.mesh-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.nodes = [];
    this.connections = [];
    this.mousePos = { x: 0, y: 0 };
    this.animationId = null;
    
    if (this.ctx) {
      this.init();
    }
  }

  init() {
    this.setupCanvas();
    this.createNodes();
    this.setupInteractions();
    this.setupResize();
    this.animate();
  }

  setupCanvas() {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
      
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
    }
  }
  
  setupResize() {
    window.addEventListener('resize', () => {
      this.setupCanvas();
      this.nodes.forEach(node => {
        node.x = Math.min(node.x, this.canvas.width);
        node.y = Math.min(node.y, this.canvas.height);
      });
    });
  }
  createNodes() {
    const nodeCount = 40;
    this.nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        energy: Math.random()
      });
    }
  }
  
  updateNodes() {
    this.nodes.forEach(node => {
      // Update position
      node.x += node.vx;
      node.y += node.vy;
      
      // Bounce off edges
      if (node.x <= 0 || node.x >= this.canvas.width) node.vx *= -1;
      if (node.y <= 0 || node.y >= this.canvas.height) node.vy *= -1;
      
      // Keep nodes in bounds
      node.x = Math.max(0, Math.min(this.canvas.width, node.x));
      node.y = Math.max(0, Math.min(this.canvas.height, node.y));
      
      // Update pulse
      node.pulsePhase += 0.02;
      node.energy = 0.5 + 0.5 * Math.sin(node.pulsePhase);
    });
  }
  
  drawNodes() {
    this.nodes.forEach(node => {
      const gradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, node.radius * 3
      );
      
      const alpha = node.opacity * node.energy;
      gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(139, 92, 246, ${alpha * 0.7})`);
      gradient.addColorStop(1, `rgba(236, 72, 153, 0)`);
      
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      
      // Core dot
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius * 0.3, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
      this.ctx.fill();
    });
  }
  
  drawConnections() {
    const maxDistance = 120;
    
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nodeA = this.nodes[i];
        const nodeB = this.nodes[j];
        
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.3;
          const energyBoost = (nodeA.energy + nodeB.energy) / 2;
          
          // Create dynamic gradient line
          const gradient = this.ctx.createLinearGradient(
            nodeA.x, nodeA.y, nodeB.x, nodeB.y
          );
          
          gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * energyBoost})`);
          gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity * energyBoost * 0.8})`);
          gradient.addColorStop(1, `rgba(236, 72, 153, ${opacity * energyBoost * 0.6})`);
          
          this.ctx.strokeStyle = gradient;
          this.ctx.lineWidth = 1;
          this.ctx.globalCompositeOperation = 'lighter';
          
          this.ctx.beginPath();
          this.ctx.moveTo(nodeA.x, nodeA.y);
          this.ctx.lineTo(nodeB.x, nodeB.y);
          this.ctx.stroke();
          
          this.ctx.globalCompositeOperation = 'source-over';
          
          // Data pulse along connection
          if (Math.random() < 0.01) {
            this.createDataPulse(nodeA, nodeB);
          }
        }
      }
    }
  }
  
  createDataPulse(nodeA, nodeB) {
    const pulse = {
      startX: nodeA.x,
      startY: nodeA.y,
      endX: nodeB.x,
      endY: nodeB.y,
      progress: 0,
      speed: 0.02,
      life: 1
    };
    
    this.dataPulses = this.dataPulses || [];
    this.dataPulses.push(pulse);
  }
  
  updateDataPulses() {
    if (!this.dataPulses) return;
    
    this.dataPulses = this.dataPulses.filter(pulse => {
      pulse.progress += pulse.speed;
      pulse.life -= 0.01;
      
      if (pulse.progress >= 1 || pulse.life <= 0) {
        return false;
      }
      
      // Draw pulse
      const x = pulse.startX + (pulse.endX - pulse.startX) * pulse.progress;
      const y = pulse.startY + (pulse.endY - pulse.startY) * pulse.progress;
      
      const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 6);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${pulse.life})`);
      gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, 4, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      
      return true;
    });
  }
  
  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mousePos.x = e.clientX - rect.left;
    this.mousePos.y = e.clientY - rect.top;
    
    // Create attraction effect
    this.nodes.forEach(node => {
      const dx = this.mousePos.x - node.x;
      const dy = this.mousePos.y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100 * 0.01;
        node.vx += dx * force;
        node.vy += dy * force;
        node.energy = Math.min(1, node.energy + 0.1);
      }
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Add subtle background gradient
    const bgGradient = this.ctx.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, 0,
      this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height) / 2
    );
    bgGradient.addColorStop(0, 'rgba(59, 130, 246, 0.02)');
    bgGradient.addColorStop(1, 'rgba(139, 92, 246, 0.01)');
    
    this.ctx.fillStyle = bgGradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.updateNodes();
    this.drawConnections();
    this.drawNodes();
    this.updateDataPulses();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  setupInteractions() {
    // Mouse interaction only - data node interactions handled by DataNodeInteractions class
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Data Node Interactive Effects Class
class DataNodeInteractions {
  constructor() {
    this.init();
  }
  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeInteractions();
      });
    } else {
      this.initializeInteractions();
    }
  }
  initializeInteractions() {
    this.setupTooltips();
    this.setupHoverEffects();
    this.setupClickEffects();
    this.addRequiredStyles();
  }
    setupTooltips() {
    const dataNodes = document.querySelectorAll('.data-node');
    
    // First, remove any existing tooltip elements
    document.querySelectorAll('.data-node-tooltip').forEach(tooltip => {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    });
    
    dataNodes.forEach((node, index) => {
      // Create tooltip element
      const tooltip = this.createTooltip(node);
      document.body.appendChild(tooltip); // Append to body instead of node for better positioning
      
      // Store reference to the tooltip on the node
      node.tooltip = tooltip;
      
      // Add hover events for tooltip
      node.addEventListener('mouseenter', (e) => {
        this.showTooltip(tooltip, node, e);
        this.triggerHoverEffect(node);
      });
      
      node.addEventListener('mouseleave', () => {
        this.hideTooltip(tooltip);
        this.resetHoverEffect(node);
      });
      
      // Update tooltip position on mouse move - only if needed
      node.addEventListener('mousemove', (e) => {
        // Only update on significant mouse movement to prevent jitter
        if (!node.lastMouseX || Math.abs(e.clientX - node.lastMouseX) > 5 || 
            !node.lastMouseY || Math.abs(e.clientY - node.lastMouseY) > 5) {
          this.updateTooltipPosition(tooltip, node, e);
          node.lastMouseX = e.clientX;
          node.lastMouseY = e.clientY;
        }
      });
    });
  }
  
  createTooltip(node) {
    const techType = node.getAttribute('data-tech');
    const tooltip = document.createElement('div');
    tooltip.className = 'data-node-tooltip';
    
    // Enhanced concise descriptions for each technology
    const descriptions = {
      'Machine Learning': 'Building intelligent systems that learn from data to predict outcomes and automate decisions.',
      'Generative AI': 'Creating novel content from text and images to code, unlocking new creative possibilities.',
      'Data Analytics': 'Transforming raw data into actionable business insights to drive strategic decisions.',
      'Automation': 'Designing intelligent workflows that increase efficiency and free up human resources.',
      'Finance': 'Using AI for risk assessment, fraud detection, and optimized investment strategies.',
      'Healthcare': 'Enabling faster diagnoses, personalized treatments, and improved patient care.',
      'Retail': 'Powering personalized shopping experiences, inventory optimization, and demand forecasting.',
      'Manufacturing': 'Enhancing production efficiency, quality control, and supply chain optimization.',
      'Agentic AI': 'Developing autonomous AI agents that perceive environments and take goal-driven actions.',
      'Marketing': 'Creating data-driven campaigns, customer segmentation, and conversion optimization.',
      'Media & Entertainment': 'Enabling content creation, audience engagement, and personalized recommendations.',
      'Travel': 'Implementing smart pricing strategies and enhancing customer travel experiences.',
      'Education': 'Delivering personalized learning paths and educational content innovation.',
      'Technology': 'Providing cutting-edge AI development and integration services for tech companies.'
    };
    
    tooltip.innerHTML = `
      <div class="tooltip-title">${techType}</div>
      <div class="tooltip-description">${descriptions[techType] || 'AI-powered solutions and innovations for business transformation.'}</div>
      <div class="tooltip-arrow"></div>
    `;
    
    return tooltip;
  }
    showTooltip(tooltip, node, event) {
    // Hide any other visible tooltips first
    document.querySelectorAll('.data-node-tooltip').forEach(otherTooltip => {
      if (otherTooltip !== tooltip && otherTooltip.style.visibility === 'visible') {
        otherTooltip.style.opacity = '0';
        otherTooltip.style.visibility = 'hidden';
        otherTooltip.style.transform = 'scale(0.95)';
      }
    });
    
    // Position the tooltip before showing it
    this.updateTooltipPosition(tooltip, node, event);
    
    // Reset any ongoing transitions with enhanced animation
    tooltip.style.transition = 'all 0.3s cubic-bezier(0.2, 0, 0.2, 1)'; // Smoother easing
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible';
    tooltip.style.transform = 'scale(1)';
    
    // Add a subtle animation highlight
    setTimeout(() => {
      tooltip.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(79, 150, 255, 0.4)';
    }, 50);
  }
  hideTooltip(tooltip) {
    // Smooth fade out
    tooltip.style.transition = 'all 0.25s cubic-bezier(0.4, 0, 1, 1)';
    tooltip.style.opacity = '0';
    tooltip.style.visibility = 'hidden';
    tooltip.style.transform = 'scale(0.95)';
    tooltip.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(59, 130, 246, 0.3)';
  }
    updateTooltipPosition(tooltip, node, event) {
    const rect = node.getBoundingClientRect();
    
    // Ensure the tooltip has proper dimensions for calculation
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
    tooltip.style.display = 'block';
    
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Position tooltip with a fixed offset from the node to avoid affecting flow
    let left = rect.left + (rect.width / 2);
    let top = rect.top - tooltipRect.height - 25; // Increased distance above node
    
    // Adjust if tooltip goes off screen
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // Check node position and adjust tooltip accordingly
    const isRightSide = rect.left > (viewport.width / 2);
    const isTopHalf = rect.top < (viewport.height / 2);
    
    // Apply smart positioning based on quadrant location
    if (isRightSide) {
      left = Math.min(left + 20, viewport.width - tooltipRect.width - 20);
    } else {
      left = Math.max(left - 20, 20);
    }
    
    // Keep the tooltip centered relative to the node
    left = rect.left + (rect.width / 2);
    
    // Ensure tooltip stays within viewport bounds
    const margin = 20;
    if (left < margin) {
      left = margin;
    }
    if (left + tooltipRect.width > viewport.width - margin) {
      left = viewport.width - tooltipRect.width - margin;
    }
    
    // If not enough room above, show below
    if (top < margin) {
      top = rect.bottom + 25; // Place below with distance
      tooltip.classList.add('tooltip-below');
    } else {
      tooltip.classList.remove('tooltip-below');
    }
    
    // Apply the positioning
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    
    // Reset visibility state
    if (node.matches(':hover')) {
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
    }
  }

  setupHoverEffects() {
    const dataNodes = document.querySelectorAll('.data-node');
    
    dataNodes.forEach((node, index) => {
      node.addEventListener('mouseenter', () => {
        this.triggerHoverEffect(node);
        this.createRippleEffect(node);
      });
      
      node.addEventListener('mouseleave', () => {
        this.resetHoverEffect(node);
      });
    });
  }
  triggerHoverEffect(node) {
    // Enhanced glow effect - using smaller scale to maintain scattered flow
    node.style.transform = 'scale(1.08)';
    node.style.zIndex = '1000';
    
    // Add glow to node core
    const nodeCore = node.querySelector('.node-core');
    if (nodeCore) {
      nodeCore.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.6)';
      nodeCore.style.background = 'radial-gradient(circle, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.3))';
    }
    
    // Enhance icon visibility
    const nodeIcon = node.querySelector('.node-icon img');
    if (nodeIcon) {
      nodeIcon.style.filter = 'brightness(1.2) saturate(1.3) drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))';
    }
    
    // Brighten label
    const nodeLabel = node.querySelector('.node-label');
    if (nodeLabel) {
      nodeLabel.style.color = '#ffffff';
      nodeLabel.style.textShadow = '0 0 10px rgba(59, 130, 246, 0.8)';
      nodeLabel.style.fontWeight = '600';
    }
  }

  resetHoverEffect(node) {
    node.style.transform = '';
    node.style.zIndex = '';
    
    const nodeCore = node.querySelector('.node-core');
    if (nodeCore) {
      nodeCore.style.boxShadow = '';
      nodeCore.style.background = '';
    }
    
    const nodeIcon = node.querySelector('.node-icon img');
    if (nodeIcon) {
      nodeIcon.style.filter = '';
    }
    
    const nodeLabel = node.querySelector('.node-label');
    if (nodeLabel) {
      nodeLabel.style.color = '';
      nodeLabel.style.textShadow = '';
      nodeLabel.style.fontWeight = '';
    }
  }

  createRippleEffect(node) {
    const ripple = document.createElement('div');
    ripple.className = 'data-node-ripple';
    
    const rect = node.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${rect.width / 2 - size / 2}px`;
    ripple.style.top = `${rect.height / 2 - size / 2}px`;
    
    node.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  setupClickEffects() {
    const dataNodes = document.querySelectorAll('.data-node');
    
    dataNodes.forEach(node => {
      node.addEventListener('click', () => {
        this.triggerClickEffect(node);
        this.createBurstEffect(node);
      });
    });
  }

  triggerClickEffect(node) {
    // Create pulsating effect
    node.style.animation = 'none';
    setTimeout(() => {
      node.style.animation = 'nodeClickPulse 0.6s ease-out';
    }, 10);
    
    // Reset animation after completion
    setTimeout(() => {
      node.style.animation = '';
    }, 600);
  }

  createBurstEffect(node) {
    const particles = 8;
    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.className = 'data-node-particle';
      
      const angle = (360 / particles) * i;
      const distance = 50 + Math.random() * 30;
      
      const endX = centerX + Math.cos(angle * Math.PI / 180) * distance;
      const endY = centerY + Math.sin(angle * Math.PI / 180) * distance;
      
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      
      document.body.appendChild(particle);
      
      // Animate particle
      setTimeout(() => {
        particle.style.transform = `translate(${endX - centerX}px, ${endY - centerY}px)`;
        particle.style.opacity = '0';
      }, 10);
      
      // Remove particle
      setTimeout(() => {
        if (particle.parentNode) {
          document.body.removeChild(particle);
        }
      }, 800);
    }
  }
  
  addRequiredStyles() {
    const styles = document.createElement('style');
    styles.textContent = `      .data-node-tooltip {
        position: fixed;
        background: rgba(15, 31, 74, 0.95); /* Darker blue background */
        color: #ffffff;
        padding: 16px 20px; /* Increased padding */
        border-radius: 10px; /* More rounded corners */
        font-size: 0.9rem;
        line-height: 1.5;
        max-width: 300px; /* Slightly wider */
        min-width: 220px; 
        z-index: 100000; /* Ensure tooltip is above everything */
        opacity: 0;
        visibility: hidden;
        transform: scale(0.95);
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); /* Smoother animation */
        backdrop-filter: blur(8px); /* Improved blur effect */
        border: 1px solid rgba(79, 150, 255, 0.4); /* Brighter border for contrast */
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(59, 130, 246, 0.3); /* Enhanced shadow */
        pointer-events: none;
        text-align: left; /* Left-aligned text for card style */
        transform-origin: center top;
      }
      
      .tooltip-title {
        font-weight: 700;
        font-size: 1.1rem; /* Larger title */
        color: #ffffff;
        margin-bottom: 10px;
        font-family: 'Space Grotesk', sans-serif;
        letter-spacing: 0.5px;
        border-bottom: 1px solid rgba(79, 150, 255, 0.3); /* Separator line */
        padding-bottom: 8px;
      }
      
      .tooltip-description {
        color: rgba(255, 255, 255, 0.9); /* Brighter text */
        font-size: 0.9rem;
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
      }
      
      .tooltip-arrow {
        position: absolute;
        bottom: -7px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 12px;
        height: 12px;
        background: rgba(15, 31, 74, 0.95); /* Match tooltip background */
        border: 1px solid rgba(79, 150, 255, 0.4); /* Match tooltip border */
        border-top: none;
        border-left: none;
      }
      
      .data-node-tooltip.tooltip-below .tooltip-arrow {
        bottom: auto;
        top: -6px;
        transform: translateX(-50%) rotate(-135deg);
        border: 1px solid rgba(79, 150, 255, 0.4); /* Match tooltip border */
        border-bottom: none;
        border-right: none;
      }
      
      .data-node-ripple {
        position: absolute;
        border: 2px solid rgba(59, 130, 246, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: dataRipple 0.6s ease-out;
        pointer-events: none;
      }
      
      @keyframes dataRipple {
        to {
          transform: scale(1);
          opacity: 0;
        }
      }
      
      .data-node-particle {
        position: fixed;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.6));
        border-radius: 50%;
        pointer-events: none;
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        z-index: 9999;
      }
      
      @keyframes nodeClickPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
      }
      
      .data-node {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        cursor: pointer;
      }
      
      .data-node:hover {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* Enhanced neural network container interactions */
      .neural-network-container .data-node {
        transform-origin: center;
      }
      
      .neural-network-container .data-node:hover {
        animation-play-state: paused;
      }
      
      /* Enhanced hero animation data nodes */
      .hero-animation .data-node {
        transform-origin: center;
      }
      
      .hero-animation .data-node:hover {
        animation-play-state: paused;
      }
      
      /* Card tooltip animation */
      .data-node-tooltip {
        animation: tooltipPulse 3s ease-in-out infinite;
        animation-play-state: paused;
      }
      
      .data-node:hover .data-node-tooltip {
        animation-play-state: running;
      }
      
      @keyframes tooltipPulse {
        0%, 100% {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(59, 130, 246, 0.3);
        }
        50% {
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(79, 150, 255, 0.5);
        }
      }
    `;
    
    document.head.appendChild(styles);
  }
}

// Create a singleton instance to prevent duplicate initializations
let dataNodeInteractionsInstance = null;

function initializeDataNodeInteractions() {
  if (!dataNodeInteractionsInstance) {
    dataNodeInteractionsInstance = new DataNodeInteractions();
  }
  return dataNodeInteractionsInstance;
}

// Initialize data node interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDataNodeInteractions);

// Also initialize immediately if DOM is already loaded
if (document.readyState !== 'loading') {
  initializeDataNodeInteractions();
}

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataNodeInteractions;
}
