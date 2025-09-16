// Project Details JavaScript Functions

// Project data for modal display
const projectData = {
    1: {
        title: "مشروع تصميم داخلي 1",
        description: "وصف تفصيلي للمشروع الأول مع جميع التفاصيل والمواصفات",
        images: ["images/office-design.jpg"],
        details: {
            area: "120 متر مربع",
            duration: "3 أشهر",
            style: "عصري",
            budget: "متوسط"
        }
    },
    2: {
        title: "مشروع تصميم داخلي 2",
        description: "وصف تفصيلي للمشروع الثاني مع جميع التفاصيل والمواصفات",
        images: ["images/new-apartment-1.webp"],
        details: {
            area: "150 متر مربع",
            duration: "4 أشهر",
            style: "كلاسيكي",
            budget: "عالي"
        }
    },
    3: {
        title: "مشروع تصميم داخلي 3",
        description: "وصف تفصيلي للمشروع الثالث مع جميع التفاصيل والمواصفات",
        images: ["images/new-villa-1.jpg"],
        details: {
            area: "200 متر مربع",
            duration: "5 أشهر",
            style: "مختلط",
            budget: "عالي"
        }
    },
    4: {
        title: "مشروع تصميم داخلي 4",
        description: "وصف تفصيلي للمشروع الرابع مع جميع التفاصيل والمواصفات",
        images: ["images/luxury-villa.jpg"],
        details: {
            area: "180 متر مربع",
            duration: "4 أشهر",
            style: "فاخر",
            budget: "عالي جداً"
        }
    },
    5: {
        title: "مشروع تصميم داخلي 5",
        description: "وصف تفصيلي للمشروع الخامس مع جميع التفاصيل والمواصفات",
        images: ["images/modern-apartment.jpg"],
        details: {
            area: "100 متر مربع",
            duration: "2.5 أشهر",
            style: "عصري",
            budget: "متوسط"
        }
    },
    6: {
        title: "مشروع تصميم داخلي 6",
        description: "وصف تفصيلي للمشروع السادس مع جميع التفاصيل والمواصفات",
        images: ["images/new-villa-2.jpg"],
        details: {
            area: "220 متر مربع",
            duration: "6 أشهر",
            style: "كلاسيكي فاخر",
            budget: "عالي جداً"
        }
    },
    7: {
        title: "مشروع تصميم داخلي 7",
        description: "وصف تفصيلي للمشروع السابع مع جميع التفاصيل والمواصفات",
        images: ["images/new-apartment-2.jpg"],
        details: {
            area: "90 متر مربع",
            duration: "2 أشهر",
            style: "مينيماليستي",
            budget: "متوسط"
        }
    },
    8: {
        title: "مشروع تصميم داخلي 8",
        description: "وصف تفصيلي للمشروع الثامن مع جميع التفاصيل والمواصفات",
        images: ["images/modern-office.jpg"],
        details: {
            area: "160 متر مربع",
            duration: "3.5 أشهر",
            style: "عصري",
            budget: "عالي"
        }
    },
    9: {
        title: "مشروع تصميم داخلي 9",
        description: "وصف تفصيلي للمشروع التاسع مع جميع التفاصيل والمواصفات",
        images: ["images/new-kitchen-1.jpg"],
        details: {
            area: "140 متر مربع",
            duration: "3 أشهر",
            style: "مختلط",
            budget: "متوسط إلى عالي"
        }
    },
    10: {
        title: "مشروع تصميم داخلي 10",
        description: "وصف تفصيلي للمشروع العاشر مع جميع التفاصيل والمواصفات",
        images: ["images/office-design.jpg"],
        details: {
            area: "250 متر مربع",
            duration: "7 أشهر",
            style: "فاخر جداً",
            budget: "استثنائي"
        }
    }
};

// Open project modal
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    // Get project from projectLoader instead of projectData
    if (!window.projectLoader) {
        console.error('projectLoader is not available');
        return;
    }
    
    const project = window.projectLoader.getProjectById(projectId);
    
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }
    
    const currentLang = document.documentElement.lang || 'ar';
    
    modalContent.innerHTML = `
        <h2 style="color: #d4af37; margin-bottom: 20px; font-size: 1.8rem;">${project.title}</h2>
        
        <div style="margin-bottom: 25px;">
            <h3 style="color: #2c3e50; margin-bottom: 15px; font-size: 1.3rem;">${currentLang === 'ar' ? 'معرض الصور' : 'Image Gallery'}</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                ${project.images.map((image, index) => `
                    <div style="position: relative; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="${image}" alt="${project.title} - صورة ${index + 1}" 
                             style="width: 100%; height: 200px; object-fit: cover; cursor: pointer; transition: transform 0.3s ease;"
                             onclick="zoomImage('${image}')"
                             onmouseover="this.style.transform='scale(1.05)'" 
                             onmouseout="this.style.transform='scale(1)'">
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div style="margin-top: 25px; text-align: center;">
            <button onclick="closeProjectModal()" style="background: linear-gradient(135deg, #d4af37, #f4d03f); color: white; border: none; padding: 12px 30px; border-radius: 25px; font-size: 1rem; cursor: pointer; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                ${currentLang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add click outside to close
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeProjectModal();
        }
    };
}

// Close project modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Zoom image function
function zoomImage(imageSrc) {
    const modal = document.getElementById('imageZoomModal');
    const zoomedImage = document.getElementById('zoomedImage');
    
    zoomedImage.src = imageSrc;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add click outside to close
    modal.onclick = function(event) {
        if (event.target === modal || event.target === zoomedImage) {
            closeImageZoom();
        }
    };
}

// Close image zoom modal
function closeImageZoom() {
    const modal = document.getElementById('imageZoomModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
        closeImageZoom();
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Add loading animation for images
    const projectImages = document.querySelectorAll('.project-img');
    projectImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add error handling
        img.addEventListener('error', function() {
            this.src = 'images/placeholder.jpg'; // Fallback image
            this.alt = 'صورة غير متوفرة';
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add touch support for mobile devices
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(event) {
        touchStartY = event.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(event) {
        touchEndY = event.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could trigger some action
                console.log('Swiped up');
            } else {
                // Swipe down - could trigger some action
                console.log('Swiped down');
            }
        }
    }
    
    // Add performance optimization
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries, observer) {
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
});

// Add resize handler for responsive behavior
window.addEventListener('resize', function() {
    // Close modals on orientation change
    if (window.innerHeight < window.innerWidth) {
        closeProjectModal();
        closeImageZoom();
    }
});

// Add print functionality
function printPage() {
    window.print();
}

// Add share functionality
function shareProject(projectId) {
    if (navigator.share) {
        navigator.share({
            title: `مشروع ${projectId} - معتز جبر للتصميم الداخلي`,
            text: 'شاهد هذا المشروع الرائع',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('تم نسخ الرابط إلى الحافظة');
        });
    }
}

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach((btn, index) => {
        if (btn.querySelector('.fa-eye')) {
            btn.setAttribute('aria-label', 'عرض تفاصيل المشروع');
        } else if (btn.querySelector('.fa-search-plus')) {
            btn.setAttribute('aria-label', 'تكبير الصورة');
        }
    });
    
    // Add focus management for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                // Trap focus within modal
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    });
});

