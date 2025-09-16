// Modern Website JavaScript with Multi-language Support

// Language System
const languages = {
    ar: {
        dir: 'rtl',
        font: 'Cairo'
    },
    en: {
        dir: 'ltr', 
        font: 'Inter'
    }
};

let currentLanguage = 'ar';

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Detect if mobile
    const isMobile = window.innerWidth <= 768;
    // Initialize AOS (Animate On Scroll) with faster duration
    AOS.init({
        duration: 500,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    // تعطيل particles.js على الموبايل
    if (!isMobile && typeof particlesJS !== 'undefined') {
        // particlesJS.load('particles-js', 'particles.json', function() {
        //     console.log('Particles.js config loaded');
        // });
    } else if (isMobile) {
        const particlesDiv = document.getElementById('particles-js');
        if (particlesDiv) particlesDiv.style.display = 'none';
    }
    // Initialize language system
    initializeLanguageSystem();
});

// Language System Functions
function initializeLanguageSystem() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

function switchLanguage(lang) {
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    const langConfig = languages[lang];
    
    // Update HTML attributes
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', langConfig.dir);
    
    // Update body class for styling
    document.body.className = document.body.className.replace(/lang-\w+/, '') + ` lang-${lang}`;
    
    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-ar][data-en]');
    translatableElements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = text;
            } else if (element.tagName === 'OPTION') {
                element.textContent = text;
            } else {
                element.innerHTML = text;
            }
        }
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update font family
    document.body.style.fontFamily = `${langConfig.font}, sans-serif`;
    
    // Trigger layout recalculation for RTL/LTR switch
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
}

// Loading Screen - Only show on first visit
function showLoadingScreenOnFirstVisit() {
    // Check if this is the first visit using localStorage
    const hasVisitedBefore = localStorage.getItem('mgDesignsVisited');
    
    if (!hasVisitedBefore) {
        // First visit - show loading screen
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            
            // Animate MG STUDIO first, then Moataz gabr
            const mgLogo = document.querySelector('.mg-logo');
            const moatazGabr = document.querySelector('.moataz-gabr');
            
            if (mgLogo) {
                mgLogo.style.display = 'inline-block';
                mgLogo.style.opacity = '0';
                mgLogo.style.transform = 'scale(0.7)';
                
                setTimeout(() => {
                    mgLogo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    mgLogo.style.opacity = '1';
                    mgLogo.style.transform = 'scale(1)';
                }, 100);
            }

            setTimeout(() => {
                if (mgLogo) {
                    mgLogo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    mgLogo.style.opacity = '0';
                    mgLogo.style.transform = 'scale(0.7)';
                }
                setTimeout(() => {
                    if (mgLogo) mgLogo.style.display = 'none';
                    if (moatazGabr) {
                        moatazGabr.style.display = 'inline-block';
                        moatazGabr.style.opacity = '0';
                        moatazGabr.style.transform = 'scale(0.7)';
                        setTimeout(() => {
                            moatazGabr.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            moatazGabr.style.opacity = '1';
                            moatazGabr.style.transform = 'scale(1)';
                        }, 100);
                    }
                }, 500);
            }, 1500);

            // Hide loading screen after animation
            setTimeout(() => {
                hideLoadingScreen();
            }, 3500);
            
            // Mark as visited
            localStorage.setItem('mgDesignsVisited', 'true');
        }
    } else {
        // Not first visit - hide loading screen immediately
        hideLoadingScreen();
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Initialize loading screen on page load
window.addEventListener('load', showLoadingScreenOnFirstVisit);

// Particles.js Configuration
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#00D4FF', '#7C3AED', '#E02127']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00D4FF',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu
                navMenu.classList.remove('active');
                
                // Reset hamburger
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// Update active navigation link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Animated counters for statistics
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
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
        });
        
        observer.observe(counter);
    });
}

// Call animateCounters when the page loads or when the section becomes visible
document.addEventListener("DOMContentLoaded", animateCounters);

// Portfolio filtering
const portfolioFilters = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

portfolioFilters.forEach(filter => {
    filter.addEventListener("click", function() {
        const filterValue = this.getAttribute("data-filter");

        // Update active filter
        portfolioFilters.forEach(f => f.classList.remove("active"));
        this.classList.add("active");

        // Filter portfolio items
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute("data-category");

            if (filterValue === "all") {
                item.style.display = "block";
                item.style.animation = "fadeIn 0.5s ease";
            } else if (filterValue === "interior-design") {
                if (itemCategory === "interior-design-modern-classic" || itemCategory === "interior-design-site") {
                    item.style.display = "block";
                    item.style.animation = "fadeIn 0.5s ease";
                } else {
                    item.style.display = "none";
                }
            } else if (filterValue === "wooden-designs") {
                if (itemCategory.startsWith("wooden-")) {
                    item.style.display = "block";
                    item.style.animation = "fadeIn 0.5s ease";
                } else {
                    item.style.display = "none";
                }
            } else {
                item.style.display = "none";
            }
        });
    });
});

// Add click event listener to View Details buttons
document.querySelectorAll(".portfolio-btn").forEach(button => {
    button.addEventListener("click", function() {
        const portfolioItem = this.closest(".portfolio-item");
        const projectId = portfolioItem.getAttribute("data-project-id");
        if (projectId) {
            window.location.href = `project-details.html?id=${projectId}`;
        }
    });
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    let data = Object.fromEntries(formData);
    // إضافة تاريخ الإرسال وحالة الاستشارة
    data.created_at = new Date().toISOString();
    data.status = "new";
    
    // تحقق صارم من جميع الحقول المطلوبة
    const requiredFields = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message
    };
    
    // التحقق من أن جميع الحقول ممتلئة
    const emptyFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value || value.trim() === '')
        .map(([key]) => key);
    
    if (emptyFields.length > 0 || data.service === "") {
        const errorMsg = currentLanguage === 'ar' ? 
            'يرجى ملء جميع الحقول المطلوبة واختيار نوع الخدمة' : 
            'Please fill in all required fields and choose a service type';
        showNotification(errorMsg, 'error');
        return;
    }
    
    // تحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        const errorMsg = currentLanguage === 'ar' ? 
            'يرجى إدخال بريد إلكتروني صحيح' : 
            'Please enter a valid email address';
        showNotification(errorMsg, 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const loadingText = currentLanguage === 'ar' ? 
        '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...' :
        '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    submitBtn.innerHTML = loadingText;
    submitBtn.disabled = true;

    try {
        // استخدام api.js لإرسال الاستشارة
        if (typeof api !== 'undefined' && api.createConsultation) {
            const result = await api.createConsultation(data);
            if (result) {
                // رسالة نجاح
                const successMsg = currentLanguage === 'ar' ? 
                    'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً' :
                    'Your message has been sent successfully! We will contact you soon';
                showNotification(successMsg, 'success');
                this.reset();
            } else {
                throw new Error('Failed to create consultation');
            }
        } else {
            // fallback إذا لم يكن api.js متاحاً
            const response = await fetch('/api/consultations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Network error');
            // رسالة نجاح
            const successMsg = currentLanguage === 'ar' ? 
                'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً' :
                'Your message has been sent successfully! We will contact you soon';
            showNotification(successMsg, 'success');
            this.reset();
        }
    } catch (error) {
        const errorMsg = currentLanguage === 'ar' ? 
            'حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.' :
            'An error occurred while sending your message. Please try again.';
        showNotification(errorMsg, 'error');
        console.error('Error sending consultation:', error);
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
  });
}

// WhatsApp integration
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('whatsapp-btn') || e.target.closest('.whatsapp-btn')) {
        e.preventDefault();
        const phoneNumber = '201270005969'; // Remove + and spaces
        const message = currentLanguage === 'ar' ? 
            'مرحباً، أريد الاستفسار عن خدمات التصميم الداخلي' :
            'Hello, I would like to inquire about interior design services';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        ${currentLanguage === 'ar' ? 'right: 20px;' : 'left: 20px;'}
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn${currentLanguage === 'ar' ? 'Right' : 'Left'} 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = `slideOut${currentLanguage === 'ar' ? 'Right' : 'Left'} 0.3s ease`;
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = `slideOut${currentLanguage === 'ar' ? 'Right' : 'Left'} 0.3s ease`;
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideInLeft {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutLeft {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0 5px;
    }
    
    /* Language-specific styles */
    .lang-ar .notification-close {
        margin-left: 0;
        margin-right: auto;
    }
`;
document.head.appendChild(notificationStyles);

// Floating elements animation
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(124, 58, 237, 0.1));
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
            z-index: 1;
        `;
        hero.appendChild(element);
    }
}

// Initialize floating elements
createFloatingElements();

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .feature-item').forEach(el => {
    observer.observe(el);
});

// Add custom cursor effect
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.custom-cursor');
    cursorElement.style.left = e.clientX - 10 + 'px';
    cursorElement.style.top = e.clientY - 10 + 'px';
});

// Add hover effects for interactive elements
document.addEventListener('mouseover', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    if (e.target.matches('button, a, .portfolio-item, .service-card')) {
        cursor.style.transform = 'scale(2)';
        cursor.style.background = 'radial-gradient(circle, rgba(224, 33, 39, 0.8), transparent)';
    }
});

document.addEventListener('mouseout', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    if (e.target.matches('button, a, .portfolio-item, .service-card')) {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.8), transparent)';
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-dependent functions here
}, 16)); // ~60fps

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// تم حذف كود Service Worker نهائيًا

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next section
            console.log('Swiped left');
        } else {
            // Swipe right - previous section
            console.log('Swiped right');
        }
    }
}

// ===== تبديل أماكن كروت الخدمات تلقائيًا في الهيرو =====
document.addEventListener('DOMContentLoaded', function() {
  const heroVisual = document.querySelector('.hero-visual');
  if (!heroVisual) return;
  const cards = Array.from(heroVisual.querySelectorAll('.floating-card'));
  // ترتيب الكلاسات حسب المواقع
  const positions = ['triangle-top', 'triangle-left', 'triangle-right'];
  let current = 0;

  function updateCards() {
    // أزل كل الكلاسات
    cards.forEach(card => {
      positions.forEach(pos => card.classList.remove(pos));
    });
    // أضف الكلاسات حسب الترتيب الحالي
    for (let i = 0; i < cards.length; i++) {
      const pos = positions[(i + current) % 3];
      cards[i].classList.add(pos);
    }
  }

  updateCards();
  setInterval(() => {
    current = (current + 1) % 3;
    updateCards();
  }, 3000);
});

// تفعيل أزرار الاستشارة ومعرض الأعمال

document.addEventListener('DOMContentLoaded', function() {
  // زر احجز استشارة مجانية (الهيرو)
  document.querySelectorAll('.hero-buttons .btn-primary, .cta-buttons .btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  // زر تصفح معرض الأعمال
  document.querySelectorAll('.cta-buttons .btn-secondary, .hero-buttons .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Add any additional initialization here
    
    // Preload critical resources
    const criticalImages = [
        'logo.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Function to add version parameter to prevent cache
function addVersionToUrl(url) {
    const timestamp = new Date().getTime();
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${timestamp}`;
}

// Add version to CSS and JS files
document.addEventListener('DOMContentLoaded', function() {
    // Add version to CSS files
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    cssLinks.forEach(link => {
        if (link.href && !link.href.includes('http')) {
            link.href = addVersionToUrl(link.href);
        }
    });
    
    // Add version to JS files
    const scriptTags = document.querySelectorAll('script[src]');
    scriptTags.forEach(script => {
        if (script.src && !script.src.includes('http')) {
            script.src = addVersionToUrl(script.src);
        }
    });
});

// Mobile Drawer Toggle
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerCloseBtn = document.getElementById('drawerCloseBtn');

// إنشاء overlay إذا لم يكن موجوداً
let drawerOverlay = document.querySelector('.mobile-drawer-overlay');
if (!drawerOverlay) {
    drawerOverlay = document.createElement('div');
    drawerOverlay.className = 'mobile-drawer-overlay';
    document.body.appendChild(drawerOverlay);
}

// فحص وجود العناصر قبل استخدامها
if (!mobileDrawer || !drawerCloseBtn) {
    console.warn('Mobile drawer elements not found');
}

function openDrawer() {
    if (mobileDrawer && drawerOverlay) {
        mobileDrawer.classList.add('active');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
function closeDrawer() {
    if (mobileDrawer && drawerOverlay) {
        mobileDrawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}
if (navToggle) {
    navToggle.addEventListener('click', openDrawer);
}
if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
}
if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
}
// إغلاق drawer عند الضغط على رابط
if (mobileDrawer) {
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });
}

