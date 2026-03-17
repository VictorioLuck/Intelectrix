/* VARIABLES Y RESET */
:root {
    --primary: #32ff7e;
    --secondary: #7efff5;
    --dark: #0a0a0a;
    --card-bg: #161616;
    --glow-primary: rgba(50, 255, 126, 0.4);
    --glow-secondary: rgba(126, 255, 245, 0.3);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--dark);
    color: #e0e0e0;
    line-height: 1.6;
    overflow-x: hidden;
}

/* FONDO ANIMADO DE PARTÍCULAS */
#particles-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

/* NAVBAR MEJORADA */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    background: rgba(10, 10, 10, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.scrolled {
    height: 60px;
    background: rgba(10, 10, 10, 0.95);
    border-bottom: 1px solid var(--primary);
    box-shadow: 0 5px 30px rgba(50, 255, 126, 0.15);
}

.logo-container {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
}

.nav-logo {
    height: 45px;
    width: auto;
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 8px var(--glow-primary));
}

.navbar.scrolled .nav-logo {
    height: 35px;
}

.brand-name {
    font-family: 'Orbitron', sans-serif;
    color: var(--primary);
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: 2px;
    text-shadow: 0 0 15px var(--glow-primary);
    animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
    0%, 100% { text-shadow: 0 0 15px var(--glow-primary); }
    50% { text-shadow: 0 0 25px var(--glow-primary), 0 0 35px var(--glow-primary); }
}

.menu-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
    z-index: 1001;
}

.menu-toggle .bar {
    width: 28px;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    margin: 4px 0;
    border-radius: 2px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 10px;
}

.nav-links a {
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 30px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.nav-links a::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--glow-primary), transparent);
    transition: left 0.5s ease;
}

.nav-links a:hover::before {
    left: 100%;
}

.nav-links a:hover {
    color: var(--primary);
    background: rgba(50, 255, 126, 0.1);
    box-shadow: 0 0 20px rgba(50, 255, 126, 0.2);
}

/* HERO SECTION MEJORADA */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(20, 30, 25, 0.9) 50%, rgba(10, 10, 10, 0.95) 100%),
                url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070') center/cover;
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 10, 0.8) 100%);
    z-index: 1;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, 
        rgba(50, 255, 126, 0.03) 0%, 
        transparent 50%, 
        rgba(126, 255, 245, 0.03) 100%);
    animation: gradient-shift 8s ease-in-out infinite;
}

@keyframes gradient-shift {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
}

.hero-content {
    position: relative;
    z-index: 2;
    padding: 20px;
    max-width: 900px;
}

.hero h1 {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2.2rem, 6vw, 4rem);
    margin-bottom: 1.5rem;
    line-height: 1.2;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 1s ease forwards 0.3s;
}

.highlight {
    color: var(--primary);
    text-shadow: 0 0 20px var(--glow-primary), 0 0 40px var(--glow-primary);
    position: relative;
    display: inline-block;
}

.highlight::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
    border-radius: 2px;
}

.typing-text {
    display: inline;
}

.cursor {
    display: inline-block;
    width: 3px;
    height: 1em;
    background: var(--primary);
    margin-left: 5px;
    animation: blink 1s infinite;
    vertical-align: middle;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

.hero p {
    font-size: clamp(1rem, 2vw, 1.3rem);
    color: #b0b0b0;
    margin-bottom: 2.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 1s ease forwards 0.6s;
}

.hero-btns {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 1s ease forwards 0.9s;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.btn-primary, .btn-secondary {
    padding: 16px 40px;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    border: none;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary) 0%, #2ecc71 100%);
    color: #000;
    box-shadow: 0 5px 25px rgba(50, 255, 126, 0.4);
}

.btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s ease;
}

.btn-primary:hover::before {
    left: 100%;
}

.btn-primary:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 40px rgba(50, 255, 126, 0.6);
}

.btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid var(--primary);
    position: relative;
}

.btn-secondary::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: var(--primary);
    transition: width 0.4s ease;
    z-index: -1;
}

.btn-secondary:hover::before {
    width: 100%;
}

.btn-secondary:hover {
    color: #000;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(50, 255, 126, 0.3);
}

/* SCROLL INDICATOR */
.scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    opacity: 0;
    animation: fadeIn 1s ease forwards 1.5s;
    z-index: 2;
}

.scroll-indicator span {
    font-size: 0.75rem;
    color: var(--primary);
    text-transform: uppercase;
    letter-spacing: 2px;
}

.scroll-mouse {
    width: 26px;
    height: 40px;
    border: 2px solid var(--primary);
    border-radius: 13px;
    position: relative;
}

.scroll-wheel {
    width: 4px;
    height: 8px;
    background: var(--primary);
    border-radius: 2px;
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    animation: scroll-wheel 1.5s ease-in-out infinite;
}

@keyframes scroll-wheel {
    0% { top: 8px; opacity: 1; }
    100% { top: 20px; opacity: 0; }
}

@keyframes fadeIn {
    to { opacity: 1; }
}

/* SECCIÓN SERVICIOS MEJORADA */
.container {
    padding: 120px 8% 100px;
    position: relative;
    z-index: 1;
}

.title {
    text-align: center;
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    margin-bottom: 60px;
    color: var(--secondary);
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
}

.title::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    border-radius: 2px;
    box-shadow: 0 0 15px var(--glow-primary);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 35px;
    max-width: 1400px;
    margin: 0 auto;
}

.card {
    background: linear-gradient(145deg, var(--card-bg) 0%, #1a1a1a 100%);
    padding: 50px 30px;
    border-radius: 24px;
    text-align: center;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
}

.card.revealed {
    opacity: 1;
    transform: translateY(0);
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(50, 255, 126, 0.05), transparent);
    transition: left 0.8s ease;
}

.card:hover::before {
    left: 100%;
}

.card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(135deg, var(--primary), var(--secondary), transparent, transparent);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
}

.card:hover::after {
    opacity: 1;
}

.card:hover {
    transform: translateY(-15px) scale(1.02);
    border-color: transparent;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 
                0 0 30px rgba(50, 255, 126, 0.15);
}

.icon-wrapper {
    width: 90px;
    height: 90px;
    margin: 0 auto 25px;
    background: linear-gradient(135deg, rgba(50, 255, 126, 0.1) 0%, rgba(126, 255, 245, 0.1) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.4s ease;
}

.icon-wrapper::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
}

.card:hover .icon-wrapper::before {
    opacity: 1;
}

.card:hover .icon-wrapper {
    transform: scale(1.1);
    box-shadow: 0 0 30px var(--glow-primary);
}

.icon {
    font-size: 3rem;
    line-height: 1;
}

.card h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.2rem;
    color: #fff;
    margin-bottom: 15px;
    letter-spacing: 1px;
}

.card p {
    color: #999;
    font-size: 0.95rem;
    line-height: 1.7;
}

/* REDES SOCIALES FLOTANTES MEJORADAS */
.social-float-container {
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 2000;
}

.social-float {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
}

.social-float::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
}

.social-float:hover::before {
    transform: translateX(100%);
}

.social-float img {
    width: 30px;
    transition: transform 0.3s ease;
}

.social-float:hover {
    transform: scale(1.15) rotate(5deg);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.whatsapp-float {
    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
}

.whatsapp-float:hover {
    box-shadow: 0 10px 30px rgba(37, 211, 102, 0.5);
}

.instagram-float {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
}

.instagram-float:hover {
    box-shadow: 0 10px 30px rgba(220, 39, 67, 0.5);
}

/* FOOTER MEJORADO */
footer {
    background: linear-gradient(180deg, #050505 0%, #0a0a0a 100%);
    padding: 80px 20px 40px;
    text-align: center;
    border-top: 1px solid rgba(50, 255, 126, 0.2);
    position: relative;
    z-index: 1;
}

footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
    border-radius: 2px;
}

.footer-info {
    display: flex;
    justify-content: center;
    gap: 50px;
    flex-wrap: wrap;
    margin-bottom: 40px;
}

.footer-info p {
    color: #b0b0b0;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.footer-info p:hover {
    color: var(--primary);
    transform: translateY(-2px);
}

.footer-info strong {
    color: var(--primary);
    font-weight: 600;
}

.copy {
    font-size: 0.85rem;
    color: #555;
    margin-top: 30px;
    letter-spacing: 1px;
}

/* RESPONSIVE MEJORADO */
@media (max-width: 768px) {
    .menu-toggle {
        display: flex;
    }

    .nav-links {
        position: fixed;
        right: -100%;
        top: 0;
        flex-direction: column;
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(20px);
        width: 100%;
        height: 100vh;
        justify-content: center;
        align-items: center;
        gap: 20px;
        transition: right 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .nav-links.active {
        right: 0;
    }

    .nav-links a {
        margin: 0;
        font-size: 1.3rem;
        padding: 15px 40px;
    }

    #mobile-menu.is-active .bar:nth-child(2) { 
        opacity: 0; 
        transform: translateX(20px);
    }
    #mobile-menu.is-active .bar:nth-child(1) { 
        transform: translateY(11px) rotate(45deg); 
    }
    #mobile-menu.is-active .bar:nth-child(3) { 
        transform: translateY(-11px) rotate(-45deg); 
    }

    .hero h1 { 
        font-size: 2rem; 
    }

    .hero-btns {
        flex-direction: column;
        align-items: center;
    }

    .btn-primary, .btn-secondary {
        width: 100%;
        max-width: 280px;
    }
    
    .social-float-container { 
        bottom: 20px; 
        right: 20px; 
    }
    .social-float { 
        width: 50px; 
        height: 50px; 
    }
    .social-float img { 
        width: 25px; 
    }

    .footer-info {
        flex-direction: column;
        gap: 20px;
    }

    .services-grid {
        grid-template-columns: 1fr;
        gap: 25px;
    }

    .card {
        padding: 40px 25px;
    }
}

/* EFECTOS ADICIONALES */
.glow-line {
    position: absolute;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
    opacity: 0.3;
}

/* Animación de carga para elementos */
@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
