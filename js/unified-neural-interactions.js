/**
 * Enhanced Unified Neural Network Animation and Data Node Interactive Effects
 * This file provides advanced visual effects and interactive animations for the neural network and data nodes
 * with optimized performance and responsive behavior across devices
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
    this.tooltips = new Map();
    this.initializeInteractions();
    this.addStyles();
  }  initializeInteractions() {
    console.log('Initializing data node interactions...');
    
    // Look for data nodes in both containers
    const neuralNetworkNodes = document.querySelectorAll('.neural-network-container .data-node');
    const heroAnimationNodes = document.querySelectorAll('.hero-animation .data-node');
    
    console.log(`Found ${neuralNetworkNodes.length} data nodes in neural-network-container`);
    console.log(`Found ${heroAnimationNodes.length} data nodes in hero-animation`);
    
    // Debug: Check computed styles and verify they're interactive
    console.log('=== NEURAL NETWORK NODES ===');
    neuralNetworkNodes.forEach((node, index) => {
      const label = node.querySelector('.node-label')?.textContent?.trim();
      const classes = node.className;
      const computedStyle = window.getComputedStyle(node);
      const zIndex = computedStyle.zIndex;
      const pointerEvents = computedStyle.pointerEvents;
      
      console.log(`Neural Node ${index + 1}: "${label}" (z-index: ${zIndex}, pointer-events: ${pointerEvents})`);
      
      // Add visual debug indicator for 5 seconds
      node.style.border = '3px solid red';
      node.style.boxShadow = '0 0 10px red';
      setTimeout(() => {
        node.style.border = '';
        node.style.boxShadow = '';
      }, 5000);
    });
    
    console.log('=== HERO ANIMATION NODES ===');
    heroAnimationNodes.forEach((node, index) => {
      const label = node.querySelector('.node-label')?.textContent?.trim();
      const classes = node.className;
      const computedStyle = window.getComputedStyle(node);
      const zIndex = computedStyle.zIndex;
      const pointerEvents = computedStyle.pointerEvents;
      
      console.log(`Hero Node ${index + 1}: "${label}" (z-index: ${zIndex}, pointer-events: ${pointerEvents})`);
      
      // Add visual debug indicator for 5 seconds
      node.style.border = '3px solid blue';
      node.style.boxShadow = '0 0 10px blue';
      setTimeout(() => {
        node.style.border = '';
        node.style.boxShadow = '';
      }, 5000);
    });
    
    // Combine all data nodes
    const allDataNodes = [...neuralNetworkNodes, ...heroAnimationNodes];
    console.log(`Total data nodes found: ${allDataNodes.length}`);
    
    // Verify no overlapping elements are blocking the neural network nodes
    if (neuralNetworkNodes.length > 0) {
      console.log('=== CHECKING FOR BLOCKING ELEMENTS ===');
      neuralNetworkNodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const elementAtPoint = document.elementFromPoint(centerX, centerY);
        
        if (elementAtPoint !== node && !node.contains(elementAtPoint)) {
          console.warn(`Node ${index + 1} may be blocked by:`, elementAtPoint);
        } else {
          console.log(`Node ${index + 1} is accessible at coordinates (${centerX}, ${centerY})`);
        }
      });
    }
    
    allDataNodes.forEach((node, index) => {
      const nodeTextElement = node.querySelector('.node-text') || node.querySelector('.node-label');
      const nodeText = nodeTextElement?.textContent?.trim();
      console.log(`Setting up interactions for node ${index + 1}: "${nodeText}"`);
      
      // Create and setup tooltip
      this.setupTooltip(node);
      
      // Add hover effects
      this.setupHoverEffects(node);
      
      // Add click effects
      this.setupClickEffects(node);
    });
    
    console.log('Data node interactions initialization complete');
  }
  setupTooltip(node) {
    // Check for both .node-text and .node-label structures
    const nodeTextElement = node.querySelector('.node-text') || node.querySelector('.node-label');
    const nodeText = nodeTextElement?.textContent?.trim();
    if (!nodeText) return;

    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'data-node-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-header">${nodeText}</div>
      <div class="tooltip-content">${this.getTooltipContent(nodeText)}</div>
    `;
    
    document.body.appendChild(tooltip);
    this.tooltips.set(node, tooltip);

    // Show tooltip on hover
    node.addEventListener('mouseenter', (e) => {
      this.showTooltip(node, e);
    });

    // Update tooltip position on mouse move
    node.addEventListener('mousemove', (e) => {
      this.updateTooltipPosition(node, e);
    });

    // Hide tooltip on leave
    node.addEventListener('mouseleave', () => {
      this.hideTooltip(node);
    });
  }  getTooltipContent(nodeText) {
    const tooltipMap = {
      'ML': 'Machine Learning algorithms for pattern recognition, predictive analytics, and automated decision-making across industries.',
      'Gen AI': 'Generative AI for content creation, code generation, and innovative solutions using advanced language models.',
      'Analytics': 'Advanced analytics and business intelligence for data-driven insights and strategic decision making.',
      'Automation': 'Intelligent process automation to streamline workflows, reduce costs, and improve operational efficiency.',
      'Finance': 'AI-powered financial services including algorithmic trading, risk assessment, and fraud detection.',
      'Healthcare': 'Medical AI for diagnosis, treatment optimization, drug discovery, and personalized patient care.',
      'Retail': 'E-commerce optimization, inventory management, and personalized customer experiences.',
      'Manufacturing': 'Smart manufacturing with predictive maintenance, quality control, and supply chain optimization.',
      'Agentic AI': 'Advanced autonomous AI agents that can perform complex tasks and make decisions independently.',
      'Marketing': 'AI-powered marketing automation, customer segmentation, and campaign optimization.',
      'Media': 'Content creation, recommendation systems, and audience engagement optimization.',
      'Travel': 'Smart travel planning, booking optimization, and personalized travel experiences.',
      'Education': 'Personalized learning platforms, educational content generation, and student performance analytics.',
      'Technology': 'Cutting-edge AI technology solutions and infrastructure for modern business needs.',
      'Data Analytics': 'Advanced analytics and business intelligence for data-driven insights and strategic decision making.',
      'Predictive': 'Predictive modeling and forecasting to anticipate trends, behaviors, and future outcomes.',
      'Media & Entertainment': 'Content creation, recommendation systems, and audience engagement optimization.',
      'Supply Chain': 'AI-driven supply chain optimization, demand forecasting, and inventory management solutions.',
      'Risk Mgmt': 'Advanced risk assessment and management systems using AI to identify, analyze, and mitigate business risks.'
    };
    
    return tooltipMap[nodeText] || 'Advanced AI technology solutions for modern business challenges.';
  }

  showTooltip(node, event) {
    const tooltip = this.tooltips.get(node);
    if (!tooltip) return;

    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible';
    tooltip.style.pointerEvents = 'none';
    this.updateTooltipPosition(node, event);
  }

  updateTooltipPosition(node, event) {
    const tooltip = this.tooltips.get(node);
    if (!tooltip) return;

    const tooltipRect = tooltip.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let left = event.clientX + 15;
    let top = event.clientY - tooltipRect.height - 10;

    // Adjust if tooltip goes outside viewport
    if (left + tooltipRect.width > viewport.width - 10) {
      left = event.clientX - tooltipRect.width - 15;
    }
    
    if (top < 10) {
      top = event.clientY + 15;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  hideTooltip(node) {
    const tooltip = this.tooltips.get(node);
    if (!tooltip) return;

    tooltip.style.opacity = '0';
    tooltip.style.visibility = 'hidden';
  }
  setupHoverEffects(node) {
    // Get all data nodes from both containers for the dimming effect
    const allDataNodes = [
      ...document.querySelectorAll('.neural-network-container .data-node'),
      ...document.querySelectorAll('.hero-animation .data-node')
    ];
    
    node.addEventListener('mouseenter', () => {
      // Enhanced scaling and glow
      node.style.transform = 'scale(1.15)';
      node.style.filter = 'brightness(1.2) drop-shadow(0 0 15px rgba(59, 130, 246, 0.6))';
      node.style.zIndex = '100';
      
      // Enhanced icon effects
      const nodeIcon = node.querySelector('.node-icon img');
      if (nodeIcon) {
        nodeIcon.style.transform = 'scale(1.1)';
        nodeIcon.style.filter = 'brightness(1.3) saturate(1.2)';
      }
        // Enhanced text effects
      const nodeText = node.querySelector('.node-text') || node.querySelector('.node-label');
      if (nodeText) {
        nodeText.style.color = '#60a5fa';
        nodeText.style.textShadow = '0 0 8px rgba(96, 165, 250, 0.5)';
        nodeText.style.transform = 'scale(1.05)';
      }
      
      // Enhanced core glow
      const nodeCore = node.querySelector('.node-core');
      if (nodeCore) {
        nodeCore.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.8), inset 0 0 20px rgba(139, 92, 246, 0.3)';
        nodeCore.style.background = 'radial-gradient(circle, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.2))';
      }
        // Dim other nodes for focus effect
      allDataNodes.forEach(otherNode => {
        if (otherNode !== node) {
          otherNode.style.opacity = '0.3';
          otherNode.style.filter = 'blur(1px)';
        }
      });
      
      // Create ripple effect
      this.createRippleEffect(node);
    });

    node.addEventListener('mouseleave', () => {
      // Reset node
      node.style.transform = '';
      node.style.filter = '';
      node.style.zIndex = '';
      
      // Reset icon
      const nodeIcon = node.querySelector('.node-icon img');
      if (nodeIcon) {
        nodeIcon.style.transform = '';
        nodeIcon.style.filter = '';
      }
        // Reset text
      const nodeText = node.querySelector('.node-text') || node.querySelector('.node-label');
      if (nodeText) {
        nodeText.style.color = '';
        nodeText.style.textShadow = '';
        nodeText.style.transform = '';
      }
      
      // Reset core
      const nodeCore = node.querySelector('.node-core');
      if (nodeCore) {
        nodeCore.style.boxShadow = '';
        nodeCore.style.background = '';
      }
        // Restore other nodes
      allDataNodes.forEach(otherNode => {
        otherNode.style.opacity = '';
        otherNode.style.filter = '';
      });
    });
  }

  createRippleEffect(node) {
    const ripple = document.createElement('div');
    const rect = node.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%);
      transform: scale(0);
      animation: rippleEffect 0.8s ease-out;
      pointer-events: none;
      z-index: 1000;
    `;
    
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${rect.left + rect.width/2 - size/2}px`;
    ripple.style.top = `${rect.top + rect.height/2 - size/2}px`;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
  }

  setupClickEffects(node) {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Create particle burst effect
      this.createParticleBurst(node);
      
      // Enhanced click feedback
      node.style.transform = 'scale(0.95)';
      setTimeout(() => {
        node.style.transform = 'scale(1.15)';
      }, 100);
    });
  }

  createParticleBurst(node) {
    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      const angle = (i / 12) * Math.PI * 2;
      const velocity = 50 + Math.random() * 30;
      
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #3b82f6, #8b5cf6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1001;
        left: ${centerX}px;
        top: ${centerY}px;
      `;
      
      document.body.appendChild(particle);
      
      // Animate particle
      const endX = centerX + Math.cos(angle) * velocity;
      const endY = centerY + Math.sin(angle) * velocity;
      
      particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
      ], {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => particle.remove();
    }
  }

  addStyles() {
    if (document.getElementById('data-node-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'data-node-styles';
    styles.textContent = `
      /* Data Node Tooltip Styles */
      .data-node-tooltip {
        position: fixed;
        background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 12px;
        padding: 12px 16px;
        max-width: 280px;
        font-size: 14px;
        color: #e2e8f0;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        pointer-events: none;
      }
      
      .tooltip-header {
        font-weight: 600;
        color: #60a5fa;
        margin-bottom: 6px;
        font-size: 15px;
      }
      
      .tooltip-content {
        line-height: 1.4;
        color: #cbd5e1;
      }
      
      /* Ripple Effect Animation */
      @keyframes rippleEffect {
        to {
          transform: scale(1);
          opacity: 0;
        }
      }
      
      /* Enhanced Data Node Interactions */
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
      
      /* Neural Network Canvas Animation Styles */
      @keyframes neuralRipple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      @keyframes neuralPulse {
        0%, 100% {
          transform: scale(1);
          opacity: 0.7;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.3;
        }
      }
      
      @keyframes neuralTrailFade {
        0% {
          transform: scale(1);
          opacity: 0.8;
        }
        100% {
          transform: scale(0);
          opacity: 0;
        }
      }
    `;
    
    document.head.appendChild(styles);
  }
}

// Mouse Trail Effect for Neural Network
function createNeuralTrail(x, y) {
  const trail = document.createElement('div');
  trail.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.8), transparent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    animation: neuralTrailFade 1.5s ease-out forwards;
  `;
  
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 1500);
}

// Global mouse trail for hero section
document.addEventListener('mousemove', (e) => {
  const heroSection = document.querySelector('#hero');
  if (!heroSection) return;
  
  const rect = heroSection.getBoundingClientRect();
  if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
    if (Math.random() < 0.1) { // Reduced frequency
      createNeuralTrail(e.clientX, e.clientY);
    }
  }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add a small delay to ensure all elements are fully rendered
  setTimeout(() => {
    console.log('Initializing unified neural network and data node interactions...');
    
    // Debug: Check what data nodes exist
    console.log('=== DEBUG: Checking data node structure ===');
    const neuralNodes = document.querySelectorAll('.neural-network-container .data-node');
    const heroNodes = document.querySelectorAll('.hero-animation .data-node');
    const allNodes = document.querySelectorAll('.data-node');
    
    console.log(`Total .data-node elements found: ${allNodes.length}`);
    console.log(`Neural network container nodes: ${neuralNodes.length}`);
    console.log(`Hero animation nodes: ${heroNodes.length}`);
    
    // Log each node's details
    allNodes.forEach((node, index) => {
      const label = node.querySelector('.node-label')?.textContent?.trim() || 'No label';
      const text = node.querySelector('.node-text')?.textContent?.trim() || 'No text';
      const container = node.closest('.neural-network-container') ? 'neural-network' : 
                      node.closest('.hero-animation') ? 'hero-animation' : 'other';
      console.log(`Node ${index + 1}: "${label}" (text: "${text}") in ${container}`);
    });
    console.log('=== END DEBUG ===');
    
    // Initialize neural network animation
    const neuralAnimation = new NeuralNetworkAnimation();
    
    // Initialize data node interactions
    const dataNodeInteractions = new DataNodeInteractions();
    
    // Handle resize for neural network
    window.addEventListener('resize', () => {
      neuralAnimation.setupCanvas();
      neuralAnimation.createNodes();
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      neuralAnimation.destroy();
    });
    
    console.log('Unified system initialized successfully');
  }, 100); // Small delay to ensure DOM is fully rendered
});

// Immediate test function to verify script loading
console.log('🚀 Unified Neural Interactions script loaded!');

// Test function to manually check data nodes
window.testDataNodes = function() {
  const allNodes = document.querySelectorAll('.data-node');
  console.log(`Found ${allNodes.length} data nodes:`);
  allNodes.forEach((node, i) => {
    const label = node.querySelector('.node-label')?.textContent || 'No label';
    console.log(`${i + 1}. ${label}`);
  });
  return allNodes;
};

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NeuralNetworkAnimation, DataNodeInteractions };
}
