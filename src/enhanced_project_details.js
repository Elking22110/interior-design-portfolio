// Enhanced Project Details JavaScript with Real Data Integration

// Wait for projectLoader to be available
let projectLoaderRef;

// Function to initialize projectLoader reference
function initProjectLoader() {
    console.log('Initializing projectLoader...');
    if (typeof window.projectLoader !== 'undefined') {
        projectLoaderRef = window.projectLoader;
        console.log('projectLoader initialized successfully:', projectLoaderRef);
    } else {
        console.log('projectLoader not available yet, retrying...');
        // If projectLoader is not available yet, wait a bit and try again
        setTimeout(initProjectLoader, 100);
    }
}

// Enhanced project modal functionality
function openProjectModal(projectId) {
    console.log('openProjectModal called with projectId:', projectId);
    console.log('projectLoader available:', projectLoader);
    
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    if (!projectLoaderRef) {
        console.error('projectLoader is not available');
        showNotification('خطأ في تحميل المشاريع', 'error');
        return;
    }
    
    // Get project data from the project loader
    const project = projectLoaderRef.getProjectById(projectId);
    console.log('Project data:', project);
    
    if (!project) {
        console.error('Project not found:', projectId);
        showNotification('المشروع غير موجود', 'error');
        return;
    }
    
    const currentLang = document.documentElement.lang || 'ar';
    
    // Create image gallery HTML
    const imageGalleryHTML = project.images.map((image, index) => `
        <div class="gallery-item ${index === 0 ? 'active' : ''}" onclick="switchMainImage('${image}', ${index})">
            <img src="${image}" alt="${project.title} - صورة ${index + 1}" loading="lazy">
        </div>
    `).join('');
    
    // Create project details HTML
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
            <div class="project-category">
                <span class="category-badge">${getCategoryDisplayName(project.category)}</span>
            </div>
        </div>
        
        <div class="modal-body">
            <div class="project-images-section">
                <div class="main-image-container">
                    <img id="mainProjectImage" src="${project.images[0]}" alt="${project.title}" onclick="zoomImage('${project.images[0]}')">
                    <div class="image-counter">
                        <span id="currentImageIndex">1</span> / ${project.images.length}
                    </div>
                </div>
                
                ${project.images.length > 1 ? `
                <div class="image-gallery">
                    <div class="gallery-scroll">
                        ${imageGalleryHTML}
                    </div>
                    <div class="gallery-controls">
                        <button class="gallery-btn prev" onclick="previousImage()" aria-label="الصورة السابقة">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <button class="gallery-btn next" onclick="nextImage()" aria-label="الصورة التالية">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                    </div>
                </div>
                ` : ''}
            </div>
            

        </div>
        
        <div class="modal-footer">
            <button class="close-button" onclick="closeProjectModal()">
                <i class="fas fa-times"></i>
                ${currentLang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize image gallery
    initializeImageGallery(project.images);
    
    // Add click outside to close
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeProjectModal();
        }
    };
}

// Initialize image gallery functionality
function initializeImageGallery(images) {
    window.currentImageIndex = 0;
    window.projectImages = images;
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleGalleryKeyboard);
}

// Handle keyboard navigation for gallery
function handleGalleryKeyboard(event) {
    if (!document.getElementById('projectModal').style.display === 'block') return;
    
    switch(event.key) {
        case 'ArrowLeft':
            nextImage();
            break;
        case 'ArrowRight':
            previousImage();
            break;
        case 'Escape':
            closeProjectModal();
            break;
    }
}

// Switch main image in gallery
function switchMainImage(imageSrc, index) {
    const mainImage = document.getElementById('mainProjectImage');
    const currentIndexSpan = document.getElementById('currentImageIndex');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (mainImage) {
        mainImage.src = imageSrc;
        mainImage.onclick = () => zoomImage(imageSrc);
    }
    
    if (currentIndexSpan) {
        currentIndexSpan.textContent = index + 1;
    }
    
    // Update active gallery item
    galleryItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    
    window.currentImageIndex = index;
}

// Navigate to previous image
function previousImage() {
    if (!window.projectImages || window.projectImages.length <= 1) return;
    
    const newIndex = window.currentImageIndex > 0 
        ? window.currentImageIndex - 1 
        : window.projectImages.length - 1;
    
    switchMainImage(window.projectImages[newIndex], newIndex);
}

// Navigate to next image
function nextImage() {
    if (!window.projectImages || window.projectImages.length <= 1) return;
    
    const newIndex = window.currentImageIndex < window.projectImages.length - 1 
        ? window.currentImageIndex + 1 
        : 0;
    
    switchMainImage(window.projectImages[newIndex], newIndex);
}

// Enhanced close modal function
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clean up event listeners
    document.removeEventListener('keydown', handleGalleryKeyboard);
    
    // Reset gallery state
    window.currentImageIndex = 0;
    window.projectImages = [];
}

// Get category display name
function getCategoryDisplayName(category) {
    const categoryNames = {
        'interior-design-modern-classic': 'تصميم داخلي - كلاسيكي عصري',
        'interior-design-site': 'تصميم داخلي - مواقع ومشاريع',
        'wooden-kitchens': 'أعمال خشبية - مطابخ',
        'wooden-kitchenette': 'أعمال خشبية - كيتشنيت',
        'wooden-dressing': 'أعمال خشبية - غرف ملابس',
        'wooden-laundry': 'أعمال خشبية - غسيل',
        'wooden-toilet-units': 'أعمال خشبية - وحدات حمامات',
        'wooden-others': 'أعمال خشبية - أخرى'
    };
    
    return categoryNames[category] || category;
}

// Share project functionality
function shareProject(projectId) {
    const project = projectLoader.getProjectById(projectId);
    if (!project) return;
    
    const shareData = {
        title: `${project.title} - معتز جبر للتصميم الداخلي`,
        text: project.description,
        url: `${window.location.origin}${window.location.pathname}?project=${projectId}`
    };
    
    if (navigator.share) {
        navigator.share(shareData).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareData.url).then(() => {
            showNotification('تم نسخ رابط المشروع إلى الحافظة', 'success');
        }).catch(() => {
            showNotification('فشل في نسخ الرابط', 'error');
        });
    }
}

// Download project images functionality
function downloadProjectImages(projectId) {
    const project = projectLoader.getProjectById(projectId);
    if (!project) return;
    
    showNotification('جاري تحضير الصور للتحميل...', 'info');
    
    // Create a zip file with all project images
    project.images.forEach((image, index) => {
        const link = document.createElement('a');
        link.href = image;
        link.download = `${project.title}_${index + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    showNotification('تم بدء تحميل الصور', 'success');
}

// Enhanced zoom image functionality
function zoomImage(imageSrc) {
    const modal = document.getElementById('imageZoomModal');
    const zoomedImage = document.getElementById('zoomedImage');
    
    if (!modal || !zoomedImage) {
        console.error('Image zoom modal elements not found');
        return;
    }
    
    zoomedImage.src = imageSrc;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add zoom controls
    let scale = 1;
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    
    // Reset transform
    zoomedImage.style.transform = 'scale(1) translate(0, 0)';
    
    // Zoom in/out with mouse wheel
    zoomedImage.addEventListener('wheel', function(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale *= delta;
        scale = Math.min(Math.max(0.5, scale), 3);
        this.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    });
    
    // Drag functionality
    zoomedImage.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        this.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        zoomedImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        zoomedImage.style.cursor = 'grab';
    });
    
    // Double click to reset
    zoomedImage.addEventListener('dblclick', function() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        this.style.transform = 'scale(1) translate(0, 0)';
    });
    
    // Click outside to close
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeImageZoom();
        }
    };
}

// Enhanced close image zoom
function closeImageZoom() {
    const modal = document.getElementById('imageZoomModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clean up event listeners
    const zoomedImage = document.getElementById('zoomedImage');
    if (zoomedImage) {
        zoomedImage.style.transform = 'scale(1) translate(0, 0)';
        zoomedImage.style.cursor = 'default';
    }
}

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
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Enhanced project grid rendering with better responsive design
function renderProjectGrid(projects, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    if (!projects || projects.length === 0) {
        container.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-folder-open"></i>
                <h3>لا توجد مشاريع</h3>
                <p>لا توجد مشاريع في هذا القسم حالياً</p>
            </div>
        `;
        return;
    }

    const projectsHTML = projects.map((project, index) => `
        <div class="project-card" data-project-id="${project.id}" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="project-image">
                <img src="${project.images[0] || 'images/placeholder.jpg'}" 
                     alt="${project.title}" 
                     loading="lazy"
                     onerror="this.src='images/placeholder.jpg'">
                <div class="project-overlay">
                    <div class="project-actions">
                        <button class="action-btn" onclick="openProjectModal('${project.id}')" 
                                aria-label="عرض تفاصيل المشروع" title="عرض التفاصيل">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn" onclick="zoomImage('${project.images[0] || 'images/placeholder.jpg'}')" 
                                aria-label="تكبير الصورة" title="تكبير الصورة">
                            <i class="fas fa-search-plus"></i>
                        </button>
                        <button class="action-btn" onclick="shareProject('${project.id}')" 
                                aria-label="مشاركة المشروع" title="مشاركة">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="project-badge">
                    <span>${getCategoryDisplayName(project.category)}</span>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${project.details.area}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${project.details.duration}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-palette"></i>
                        <span>${project.details.style}</span>
                    </div>
                </div>
                <div class="project-footer">
                    <button class="view-details-btn" onclick="openProjectModal('${project.id}')">
                        <span>عرض التفاصيل</span>
                        <i class="fas fa-arrow-left"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = projectsHTML;

    // Add intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    container.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize enhanced project details when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for enhanced styling
    addEnhancedStyles();
    
    // Initialize AOS for animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// Add enhanced CSS styles
function addEnhancedStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Enhanced Project Modal Styles */
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .modal-title {
            color: #d4af37;
            font-size: 2rem;
            margin: 0;
        }
        
        .category-badge {
            background: linear-gradient(135deg, #d4af37, #f4d03f);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
        }
        
        .project-images-section {
            margin-bottom: 2rem;
        }
        
        .main-image-container {
            position: relative;
            margin-bottom: 1rem;
        }
        
        .main-image-container img {
            width: 100%;
            max-height: 400px;
            object-fit: cover;
            border-radius: 10px;
            cursor: zoom-in;
        }
        
        .image-counter {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 0.5rem;
            border-radius: 5px;
            font-size: 0.9rem;
        }
        
        .image-gallery {
            position: relative;
        }
        
        .gallery-scroll {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding: 0.5rem 0;
            scrollbar-width: thin;
        }
        
        .gallery-item {
            flex-shrink: 0;
            width: 80px;
            height: 60px;
            border-radius: 5px;
            overflow: hidden;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }
        
        .gallery-item.active {
            border-color: #d4af37;
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .gallery-controls {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .gallery-btn {
            background: #d4af37;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .gallery-btn:hover {
            background: #b8941f;
            transform: scale(1.1);
        }
        
        .project-info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        
        .info-card {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            border: 1px solid #e9ecef;
        }
        
        .info-card h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .details-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .detail-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: white;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }
        
        .detail-item i {
            color: #d4af37;
            width: 20px;
        }
        
        .detail-label {
            font-weight: 600;
            color: #666;
            min-width: 80px;
        }
        
        .detail-value {
            color: #333;
            font-weight: 500;
        }
        
        .project-description-full {
            line-height: 1.8;
            color: #666;
            margin-bottom: 1.5rem;
        }
        
        .project-actions {
            display: flex;
            gap: 1rem;
        }
        
        .action-button {
            flex: 1;
            padding: 0.75rem 1rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .action-button.primary {
            background: linear-gradient(135deg, #d4af37, #f4d03f);
            color: white;
        }
        
        .action-button.secondary {
            background: #6c757d;
            color: white;
        }
        
        .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .modal-footer {
            text-align: center;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #e9ecef;
        }
        
        .close-button {
            background: #dc3545;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .close-button:hover {
            background: #c82333;
            transform: scale(1.05);
        }
        
        /* Notification Styles */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 10000;
            min-width: 300px;
            animation: slideIn 0.3s ease;
        }
        
        .notification-success { border-left: 4px solid #28a745; }
        .notification-error { border-left: 4px solid #dc3545; }
        .notification-warning { border-left: 4px solid #ffc107; }
        .notification-info { border-left: 4px solid #17a2b8; }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            color: #666;
            padding: 0.25rem;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        /* Enhanced Project Card Styles */
        .project-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(212, 175, 55, 0.9);
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .project-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 1rem 0;
        }
        
        .meta-item {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 0.9rem;
            color: #666;
        }
        
        .meta-item i {
            color: #d4af37;
        }
        
        .project-footer {
            margin-top: auto;
            padding-top: 1rem;
        }
        
        .view-details-btn {
            width: 100%;
            background: linear-gradient(135deg, #d4af37, #f4d03f);
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .view-details-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }
        
        .no-projects {
            text-align: center;
            padding: 4rem 2rem;
            color: #666;
        }
        
        .no-projects i {
            font-size: 4rem;
            color: #d4af37;
            margin-bottom: 1rem;
        }
        
        .no-projects h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        /* Project Actions Buttons */
        .project-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
            justify-content: center;
        }
        
        .eye-btn, .info-btn {
            background: linear-gradient(135deg, #d4af37, #f4d03f);
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .eye-btn:hover, .info-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }
        
        .info-btn {
            background: linear-gradient(135deg, #3498db, #2980b9);
        }
        
        /* Info Modal Styles */
        .info-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .info-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .info-modal-content {
            background: white;
            border-radius: 15px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            transform: scale(0.7);
            transition: transform 0.3s ease;
        }
        
        .info-modal.show .info-modal-content {
            transform: scale(1);
        }
        
        .info-modal-header {
            background: linear-gradient(135deg, #d4af37, #f4d03f);
            color: white;
            padding: 1.5rem;
            border-radius: 15px 15px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .info-modal-header h3 {
            margin: 0;
            font-size: 1.5rem;
        }
        
        .close-info-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .close-info-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .info-modal-body {
            padding: 2rem;
        }
        
        .project-info-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .info-section h4 {
            color: #d4af37;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .info-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .info-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .info-item i {
            color: #d4af37;
            width: 20px;
        }
        
        .image-preview-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .preview-image {
            position: relative;
            aspect-ratio: 1;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .preview-image:hover {
            transform: scale(1.05);
        }
        
        .preview-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .preview-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(212, 175, 55, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .preview-image:hover .preview-overlay {
            opacity: 1;
        }
        
        .preview-overlay i {
            color: white;
            font-size: 1.5rem;
        }
        
        .more-images {
            background: linear-gradient(135deg, #d4af37, #f4d03f);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .more-images:hover {
            transform: scale(1.05);
        }
        
        .more-images span {
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .info-modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn-primary, .btn-secondary {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #d4af37, #f4d03f);
            color: white;
        }
        
        .btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .btn-primary:hover, .btn-secondary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .project-info-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .modal-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .project-actions {
                flex-direction: column;
            }
            
            .notification {
                right: 10px;
                left: 10px;
                min-width: auto;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Function to show project information in a simple modal
function showProjectInfo(projectId) {
    console.log('showProjectInfo called with projectId:', projectId);
    
    if (!projectLoaderRef) {
        console.error('projectLoader is not available');
        showNotification('خطأ في تحميل المشاريع', 'error');
        return;
    }
    
    const project = projectLoaderRef.getProjectById(projectId);
    if (!project) {
        console.error('Project not found:', projectId);
        showNotification('المشروع غير موجود', 'error');
        return;
    }
    
    // Create info modal HTML
    const infoModalHTML = `
        <div class="info-modal">
            <div class="info-modal-content">
                <div class="info-modal-header">
                    <h3>${project.title}</h3>
                    <button class="close-info-btn" onclick="closeInfoModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="info-modal-body">
                    <div class="project-info-grid">
                        <div class="info-section">
                            <h4><i class="fas fa-info-circle"></i> وصف المشروع</h4>
                            <p>${project.description}</p>
                        </div>
                        <div class="info-section">
                            <h4><i class="fas fa-cogs"></i> تفاصيل المشروع</h4>
                            <div class="info-details">
                                <div class="info-item">
                                    <i class="fas fa-ruler-combined"></i>
                                    <span>المساحة: ${project.details.area}</span>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-clock"></i>
                                    <span>المدة: ${project.details.duration}</span>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-palette"></i>
                                    <span>الطراز: ${project.details.style}</span>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-dollar-sign"></i>
                                    <span>الميزانية: ${project.details.budget}</span>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-images"></i>
                                    <span>عدد الصور: ${project.images.length}</span>
                                </div>
                            </div>
                        </div>
                        <div class="info-section">
                            <h4><i class="fas fa-eye"></i> معاينة الصور</h4>
                            <div class="image-preview-grid">
                                ${project.images.slice(0, 6).map((image, index) => `
                                    <div class="preview-image" onclick="openProjectModal('${project.id}')">
                                        <img src="${image}" alt="صورة ${index + 1}" loading="lazy">
                                        <div class="preview-overlay">
                                            <i class="fas fa-eye"></i>
                                        </div>
                                    </div>
                                `).join('')}
                                ${project.images.length > 6 ? `
                                    <div class="more-images" onclick="openProjectModal('${project.id}')">
                                        <span>+${project.images.length - 6}</span>
                                        <i class="fas fa-images"></i>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="info-modal-actions">
                        <button class="btn-primary" onclick="openProjectModal('${project.id}')">
                            <i class="fas fa-eye"></i>
                            عرض جميع الصور
                        </button>
                        <button class="btn-secondary" onclick="closeInfoModal()">
                            <i class="fas fa-times"></i>
                            إغلاق
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = infoModalHTML;
    document.body.appendChild(modalContainer);
    
    // Show modal with animation
    setTimeout(() => {
        modalContainer.querySelector('.info-modal').classList.add('show');
    }, 10);
}

// Function to close info modal
function closeInfoModal() {
    const infoModal = document.querySelector('.info-modal');
    if (infoModal) {
        infoModal.classList.remove('show');
        setTimeout(() => {
            infoModal.parentElement.remove();
        }, 300);
    }
}

// Initialize projectLoader reference when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initProjectLoader();
});

// Also try to initialize immediately if projectLoader is already available
if (typeof window.projectLoader !== 'undefined') {
    projectLoaderRef = window.projectLoader;
}

