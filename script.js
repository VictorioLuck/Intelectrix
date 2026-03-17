/**
 * INTELECTRIX - JavaScript Profesional
 * Efectos visuales avanzados y animaciones interactivas
 */

// ============================================
// CONFIGURACIÓN GLOBAL
// ============================================
const CONFIG = {
    particles: {
        count: 60,
        color: '#32ff7e',
        connectionDistance: 150,
        speed: 0.5
    },
    scrollReveal: {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    },
    typing: {
        speed: 80,
        pause: 2000
    }
};

// ============================================
// SISTEMA DE PARTÍCULAS (CANVAS)
// ============================================
class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.isActive = true;
        
        this.init();
    }

    init() {
        // Crear canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particles-canvas';
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.ctx = this.canvas.getContext('2d');
        
        // Configurar tamaño
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Crear partículas
        this.createParticles();
        
        // Iniciar animación
        this.animate();
        
        // Pausar cuando no es visible
        document.addEventListener('visibilitychange', () => {
            this.isActive = document.visibilityState === 'visible';
            if (this.isActive) this.animate();
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < CONFIG.particles.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * CONFIG.particles.speed,
                vy: (Math.random() - 0.5) * CONFIG.particles.speed,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        if (!this.isActive) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Actualizar y dibujar partículas
        this.particles.forEach((particle, i) => {
            // Mover partícula
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebote en bordes
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Dibujar partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(50, 255, 126, ${particle.opacity})`;
            this.ctx.fill();
            
            // Conectar partículas cercanas
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < CONFIG.particles.connectionDistance) {
                    const opacity = (1 - distance / CONFIG.particles.connectionDistance) * 0.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(50, 255, 126, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// EFECTO DE TYPING
// ============================================
class TypeWriter {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.currentWordIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.speed = options.speed || CONFIG.typing.speed;
        this.pause = options.pause || CONFIG.typing.pause;
        
        this.type();
    }

    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.currentText = currentWord.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = currentWord.substring(0, this.currentText.length + 1);
        }
        
        this.element.textContent = this.currentText;
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.currentText === currentWord) {
            typeSpeed = this.pause;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// ============================================
// ANIMACIONES DE SCROLL (REVEAL)
// ============================================
class ScrollReveal {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        const options = {
            threshold: CONFIG.scrollReveal.threshold,
            rootMargin: CONFIG.scrollReveal.rootMargin
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Animación escalonada para cards
                    if (entry.target.classList.contains('card')) {
                        const cards = document.querySelectorAll('.card');
                        const index = Array.from(cards).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }
                    
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observar elementos
        document.querySelectorAll('.card').forEach(card => {
            this.observer.observe(card);
        });
    }
}

// ============================================
// NAVEGACIÓN Y NAVBAR
// ============================================
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.menuToggle = document.querySelector('#mobile-menu');
        this.menuLinks = document.querySelector('.nav-links');
        this.navLinks = document.querySelectorAll('.nav-links a');
        
        this.init();
    }

    init() {
        // Scroll handler para navbar
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Menú hamburguesa
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
        
        // Cerrar menú al hacer click en enlace
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.closeMenu();
                this.smoothScroll(e);
            });
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && this.menuLinks.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        this.menuToggle.classList.toggle('is-active');
        this.menuLinks.classList.toggle('active');
        document.body.style.overflow = this.menuLinks.classList.contains('active') ? 'hidden' : '';
    }

    closeMenu() {
        this.menuToggle.classList.remove('is-active');
        this.menuLinks.classList.remove('active');
        document.body.style.overflow = '';
    }

    smoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
}

// ============================================
// EFECTOS PARA CARDS
// ============================================
class CardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            // Efecto 3D tilt
            card.addEventListener('mousemove', (e) => this.handleTilt(e, card));
            card.addEventListener('mouseleave', () => this.resetTilt(card));
            
            // Efecto de brillo en el cursor
            card.addEventListener('mousemove', (e) => this.handleGlow(e, card));
        });
    }

    handleTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    }

    resetTilt(card) {
        card.style.transform = '';
    }

    handleGlow(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    }
}

// ============================================
// EFECTOS PARA BOTONES
// ============================================
class ButtonEffects {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => this.createRipple(e, btn));
        });
    }

    createRipple(e, btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(50, 255, 126, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            left: ${x}px;
            top: ${y}px;
            animation: ripple-effect 0.6s ease-out forwards;
        `;
        
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

// ============================================
// CONTADOR DE ESTADÍSTICAS (opcional)
// ============================================
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.startTime = null;
        
        this.animate();
    }

    animate(currentTime = 0) {
        if (!this.startTime) this.startTime = currentTime;
        
        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * this.target);
        
        this.element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame((time) => this.animate(time));
        } else {
            this.element.textContent = this.target.toLocaleString();
        }
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar sistema de partículas
    new ParticleSystem();
    
    // Inicializar navegación
    new Navigation();
    
    // Inicializar reveal de scroll
    new ScrollReveal();
    
    // Inicializar efectos de cards
    new CardEffects();
    
    // Inicializar efectos de botones
    new ButtonEffects();
    
    // Inicializar efecto de typing
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = ['Tecnología', 'Negocio', 'Productividad', 'Futuro'];
        new TypeWriter(typingElement, words);
    }
    
    // Agregar animación de ripple al CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Preloader (opcional)
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    preloader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid rgba(50, 255, 126, 0.2);
            border-top-color: var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;
    document.body.appendChild(preloader);
    
    // Remover preloader
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => preloader.remove(), 500);
        }, 500);
    });
    
    // Agregar keyframes para spin
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
});

// ============================================
// UTILIDADES
// ============================================

// Throttle function para optimizar eventos
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Exportar clases para uso global
window.Intelectrix = {
    ParticleSystem,
    TypeWriter,
    ScrollReveal,
    Navigation,
    CardEffects,
    ButtonEffects,
    CounterAnimation
};
