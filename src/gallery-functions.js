// معرض الصور المتعدد للمشاريع
// معتز جبر للتصميم الداخلي

// متغيرات عامة
let currentGalleryImages = {};
let currentImageIndex = {};

/**
 * فتح معرض صور المشروع
 * @param {string} projectId - معرف المشروع
 * @param {number} totalImages - إجمالي عدد الصور
 */
function openProjectGallery(projectId, totalImages) {
    const modal = document.getElementById(`gallery-${projectId}`);
    if (!modal) return;
    
    // تهيئة المتغيرات
    currentGalleryImages[projectId] = totalImages;
    currentImageIndex[projectId] = 0;
    
    // إظهار المعرض
    modal.style.display = 'block';
    
    // عرض الصورة الأولى
    showGalleryImage(projectId, 0);
    
    // إضافة مستمع لمفاتيح التنقل
    document.addEventListener('keydown', (e) => handleGalleryKeys(e, projectId));
    
    // منع التمرير في الخلفية
    document.body.style.overflow = 'hidden';
}

/**
 * إغلاق معرض صور المشروع
 * @param {string} projectId - معرف المشروع
 */
function closeProjectGallery(projectId) {
    const modal = document.getElementById(`gallery-${projectId}`);
    if (!modal) return;
    
    // إخفاء المعرض
    modal.style.display = 'none';
    
    // إزالة مستمع المفاتيح
    document.removeEventListener('keydown', (e) => handleGalleryKeys(e, projectId));
    
    // إعادة التمرير
    document.body.style.overflow = 'auto';
}

/**
 * تغيير الصورة في المعرض
 * @param {string} projectId - معرف المشروع
 * @param {number} direction - اتجاه التغيير (-1 للخلف، 1 للأمام)
 */
function changeGalleryImage(projectId, direction) {
    const totalImages = currentGalleryImages[projectId];
    if (!totalImages) return;
    
    let newIndex = currentImageIndex[projectId] + direction;
    
    // التبديل الدائري
    if (newIndex < 0) {
        newIndex = totalImages - 1;
    } else if (newIndex >= totalImages) {
        newIndex = 0;
    }
    
    currentImageIndex[projectId] = newIndex;
    showGalleryImage(projectId, newIndex);
}

/**
 * عرض صورة محددة في المعرض
 * @param {string} projectId - معرف المشروع
 * @param {number} imageIndex - فهرس الصورة
 */
function showGalleryImage(projectId, imageIndex) {
    const modal = document.getElementById(`gallery-${projectId}`);
    if (!modal) return;
    
    const images = modal.querySelectorAll('.gallery-img');
    const totalImages = images.length;
    
    if (imageIndex < 0 || imageIndex >= totalImages) return;
    
    // إخفاء جميع الصور
    images.forEach(img => img.style.display = 'none');
    
    // إظهار الصورة المحددة
    images[imageIndex].style.display = 'block';
    
    // تحديث الفهرس الحالي
    currentImageIndex[projectId] = imageIndex;
    
    // تحديث أزرار التنقل
    updateGalleryNavigation(projectId, imageIndex, totalImages);
}

/**
 * تحديث أزرار التنقل في المعرض
 * @param {string} projectId - معرف المشروع
 * @param {number} currentIndex - الفهرس الحالي
 * @param {number} totalImages - إجمالي عدد الصور
 */
function updateGalleryNavigation(projectId, currentIndex, totalImages) {
    const modal = document.getElementById(`gallery-${projectId}`);
    if (!modal) return;
    
    const prevBtn = modal.querySelector('.gallery-nav-btn.prev');
    const nextBtn = modal.querySelector('.gallery-nav-btn.next');
    
    if (prevBtn && nextBtn) {
        // إظهار/إخفاء أزرار التنقل حسب الحاجة
        prevBtn.style.display = totalImages > 1 ? 'block' : 'none';
        nextBtn.style.display = totalImages > 1 ? 'block' : 'none';
        
        // إضافة مؤشر للصورة الحالية
        const indicator = modal.querySelector('.gallery-indicator');
        if (indicator) {
            indicator.textContent = `${currentIndex + 1} / ${totalImages}`;
        }
    }
}

/**
 * معالجة مفاتيح لوحة المفاتيح للمعرض
 * @param {KeyboardEvent} event - حدث المفتاح
 * @param {string} projectId - معرف المشروع
 */
function handleGalleryKeys(event, projectId) {
    switch (event.key) {
        case 'ArrowLeft':
            changeGalleryImage(projectId, -1);
            break;
        case 'ArrowRight':
            changeGalleryImage(projectId, 1);
            break;
        case 'Escape':
            closeProjectGallery(projectId);
            break;
    }
}

/**
 * تكبير صورة واحدة
 * @param {string} imageSrc - مسار الصورة
 */
function zoomImage(imageSrc) {
    // إنشاء modal للتكبير إذا لم يكن موجوداً
    let zoomModal = document.getElementById('imageZoomModal');
    if (!zoomModal) {
        zoomModal = document.createElement('div');
        zoomModal.id = 'imageZoomModal';
        zoomModal.className = 'modal';
        zoomModal.innerHTML = `
            <div class="modal-content image-modal">
                <span class="close" onclick="closeImageZoom()">&times;</span>
                <img id="zoomedImage" src="" alt="صورة مكبرة">
            </div>
        `;
        document.body.appendChild(zoomModal);
    }
    
    // عرض الصورة
    const zoomedImage = document.getElementById('zoomedImage');
    if (zoomedImage) {
        zoomedImage.src = imageSrc;
    }
    
    zoomModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

/**
 * إغلاق تكبير الصورة
 */
function closeImageZoom() {
    const zoomModal = document.getElementById('imageZoomModal');
    if (zoomModal) {
        zoomModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/**
 * إغلاق جميع المعارض عند النقر خارجها
 */
document.addEventListener('click', function(event) {
    // إغلاق معارض المشاريع
    const projectModals = document.querySelectorAll('[id^="gallery-"]');
    projectModals.forEach(modal => {
        if (event.target === modal) {
            const projectId = modal.id.replace('gallery-', '');
            closeProjectGallery(projectId);
        }
    });
    
    // إغلاق تكبير الصورة
    const zoomModal = document.getElementById('imageZoomModal');
    if (zoomModal && event.target === zoomModal) {
        closeImageZoom();
    }
});

// إضافة CSS للمعرض
const galleryStyles = `
<style>
.gallery-modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
}

.gallery-modal-content {
    position: relative;
    margin: auto;
    padding: 20px;
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.gallery-container {
    position: relative;
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: none;
}

.gallery-img:first-child {
    display: block;
}

.gallery-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
}

.gallery-nav-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 24px;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.3s;
}

.gallery-nav-btn:hover {
    background: rgba(255, 255, 255, 0.4);
}

.gallery-nav-btn.prev {
    left: 20px;
}

.gallery-nav-btn.next {
    right: 20px;
}

.close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1001;
}

.close:hover {
    color: #bbb;
}

.gallery-indicator {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    background: rgba(0, 0, 0, 0.7);
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 14px;
}
</style>
`;

// إضافة الأنماط للصفحة
function addGalleryStyles() {
    if (document.head) {
        document.head.insertAdjacentHTML('beforeend', galleryStyles);
        console.log('✅ تم تحميل معرض الصور المتعدد للمشاريع مع CSS محسن');
    }
}

// إضافة الأنماط عند جاهزية DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addGalleryStyles);
} else {
    addGalleryStyles();
}
