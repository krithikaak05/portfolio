// ===== ANIMATED COUNTER =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            
            // Create mobile menu if doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = `
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="projects.html">Projects</a></li>
                        <li><a href="skills.html">Skills</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                    <a href="Krithika_Resume.pdf" download class="btn btn-primary" style="margin-top: 1rem; width: 100%; justify-content: center;">Download CV</a>
                `;
                mobileMenu.style.cssText = `
                    position: fixed;
                    top: 70px;
                    left: 0;
                    right: 0;
                    background: rgba(10, 10, 15, 0.98);
                    backdrop-filter: blur(20px);
                    padding: 2rem;
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    z-index: 999;
                `;
                mobileMenu.querySelector('ul').style.cssText = `
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    list-style: none;
                `;
                mobileMenu.querySelectorAll('a').forEach(a => {
                    a.style.cssText = `
                        color: #f8fafc;
                        font-size: 1.1rem;
                        font-weight: 500;
                        text-decoration: none;
                    `;
                });
                document.body.appendChild(mobileMenu);
            }
            
            // Toggle menu visibility
            if (mobileMenu.style.transform === 'translateY(0%)') {
                mobileMenu.style.transform = 'translateY(-100%)';
                mobileMenu.style.opacity = '0';
            } else {
                mobileMenu.style.transform = 'translateY(0%)';
                mobileMenu.style.opacity = '1';
            }
        });
    }
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== FADE IN ANIMATION ON SCROLL =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('.project-card, .skill-category, .experience-item, .contact-method');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== PARALLAX EFFECT FOR ORBS =====
function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// ===== TYPING EFFECT (Optional - for hero subtitle) =====
function initTypingEffect() {
    const element = document.querySelector('.hero-description');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    const speed = 30;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    initNavbarScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initParallax();
    // Uncomment for typing effect: initTypingEffect();
});

// ===== FORM VALIDATION (for contact page) =====
const form = document.querySelector('.contact-form form');
if (form) {
    form.addEventListener('submit', function(e) {
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = 'var(--border)';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
}
