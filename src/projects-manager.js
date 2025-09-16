// Projects Manager for Category Pages
class ProjectsManager {
    constructor() {
        this.api = new MGDesignsAPI();
        this.currentCategory = null;
        this.projects = [];
        this.categories = [];
        this.currentLanguage = document.documentElement.lang || 'ar';
    }

    // تهيئة مدير المشاريع
    async init() {
        await this.loadCategories();
        this.detectCurrentCategory();
        await this.loadProjects();
        this.setupEventListeners();
        this.updateLanguage();
    }

    // تحميل الأقسام
    async loadCategories() {
        try {
            this.categories = await this.api.getCategories();
            console.log('Categories loaded:', this.categories);
        } catch (error) {
            console.error('Error loading categories:', error);
            this.categories = [];
        }
    }

    // اكتشاف القسم الحالي من URL
    detectCurrentCategory() {
        const currentPath = window.location.pathname;
        const fileName = currentPath.split('/').pop().replace('.html', '');
        
        this.currentCategory = this.categories.find(cat => cat.slug === fileName);
        
        if (this.currentCategory) {
            console.log('Current category detected:', this.currentCategory);
            this.updatePageTitle();
        } else {
            console.warn('Category not found for:', fileName);
        }
    }

    // تحديث عنوان الصفحة
    updatePageTitle() {
        if (this.currentCategory) {
            const title = this.currentLanguage === 'ar' 
                ? this.currentCategory.name_ar 
                : this.currentCategory.name_en;
            
            document.title = `${title} - معتز جبر للتصميم الداخلي`;
            
            // تحديث عنوان الصفحة في HTML
            const pageTitle = document.querySelector('.page-title');
            if (pageTitle) {
                pageTitle.textContent = title;
                pageTitle.setAttribute('data-ar', this.currentCategory.name_ar);
                pageTitle.setAttribute('data-en', this.currentCategory.name_en);
            }
        }
    }

    // تحميل المشاريع
    async loadProjects() {
        try {
            if (this.currentCategory) {
                this.projects = await this.api.getProjectsByCategory(this.currentCategory.id);
            } else {
                this.projects = await this.api.getProjects();
            }
            
            console.log('Projects loaded:', this.projects);
            this.renderProjects();
        } catch (error) {
            console.error('Error loading projects:', error);
            this.projects = [];
            this.renderProjects();
        }
    }

    // عرض المشاريع
    renderProjects() {
        const projectsContainer = document.querySelector('.projects-grid');
        if (!projectsContainer) {
            console.warn('Projects container not found');
            return;
        }

        projectsContainer.innerHTML = '';

        if (this.projects.length === 0) {
            this.showNoProjectsMessage();
            return;
        }

        this.projects.forEach((project, index) => {
            const projectElement = this.createProjectElement(project, index);
            projectsContainer.appendChild(projectElement);
        });
    }

    // إنشاء عنصر المشروع
    createProjectElement(project, index) {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-card';
        projectDiv.setAttribute('data-aos', 'fade-up');
        projectDiv.setAttribute('data-aos-delay', (index * 100).toString());
        
        const title = this.currentLanguage === 'ar' ? project.title_ar : project.title_en;
        const description = this.currentLanguage === 'ar' ? project.description_ar : project.description_en;
        const tags = this.currentLanguage === 'ar' ? (project.tags || []) : (project.tags_en || []);
        
        projectDiv.innerHTML = `
            <div class="project-image">
                <img src="${project.images[0]}" alt="${title}" class="project-img">
                <div class="project-overlay">
                    <div class="project-actions">
                        <button class="action-btn view-btn" onclick="projectsManager.openProjectModal('${project.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn zoom-btn" onclick="projectsManager.zoomImage('${project.images[0]}')">
                            <i class="fas fa-search-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title" data-ar="${project.title_ar}" data-en="${project.title_en}">${title}</h3>
                <p class="project-description" data-ar="${project.description_ar}" data-en="${project.description_en}">${description}</p>
                <div class="project-tags">
                    ${tags.map(tag => `<span class="tag" data-ar="${tag}" data-en="${tag}">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        return projectDiv;
    }

    // عرض رسالة عدم وجود مشاريع
    showNoProjectsMessage() {
        const projectsContainer = document.querySelector('.projects-grid');
        if (projectsContainer) {
            projectsContainer.innerHTML = `
                <div class="no-projects-message">
                    <i class="fas fa-folder-open"></i>
                    <h3 data-ar="لا توجد مشاريع حالياً" data-en="No projects available">لا توجد مشاريع حالياً</h3>
                    <p data-ar="سيتم إضافة مشاريع جديدة قريباً" data-en="New projects will be added soon">سيتم إضافة مشاريع جديدة قريباً</p>
                </div>
            `;
        }
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // مستمع تغيير اللغة
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentLanguage = btn.getAttribute('data-lang');
                this.updateLanguage();
            });
        });

        // مستمع البحث
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProjects(e.target.value);
            });
        }

        // مستمع الفلترة
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.filterProjectsByTag(filter);
            });
        });
    }

    // تحديث اللغة
    updateLanguage() {
        this.renderProjects();
        this.updatePageTitle();
        
        // تحديث جميع العناصر القابلة للترجمة
        const translatableElements = document.querySelectorAll('[data-ar][data-en]');
        translatableElements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLanguage}`);
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
    }

    // فلترة المشاريع بالبحث
    filterProjects(searchTerm) {
        if (!searchTerm.trim()) {
            this.renderProjects();
            return;
        }

        const filteredProjects = this.projects.filter(project => {
            const titleAr = project.title_ar.toLowerCase();
            const titleEn = project.title_en.toLowerCase();
            const descAr = project.description_ar.toLowerCase();
            const descEn = project.description_en.toLowerCase();
            const search = searchTerm.toLowerCase();

            return titleAr.includes(search) || 
                   titleEn.includes(search) || 
                   descAr.includes(search) || 
                   descEn.includes(search);
        });

        this.renderFilteredProjects(filteredProjects);
    }

    // فلترة المشاريع بالعلامات
    filterProjectsByTag(tag) {
        if (!tag || tag === 'all') {
            this.renderProjects();
            return;
        }

        const filteredProjects = this.projects.filter(project => {
            const tags = this.currentLanguage === 'ar' ? project.tags : project.tags_en;
            return tags.includes(tag);
        });

        this.renderFilteredProjects(filteredProjects);
    }

    // عرض المشاريع المفلترة
    renderFilteredProjects(filteredProjects) {
        const projectsContainer = document.querySelector('.projects-grid');
        if (!projectsContainer) return;

        projectsContainer.innerHTML = '';

        if (filteredProjects.length === 0) {
            projectsContainer.innerHTML = `
                <div class="no-results-message">
                    <i class="fas fa-search"></i>
                    <h3 data-ar="لا توجد نتائج" data-en="No results found">لا توجد نتائج</h3>
                    <p data-ar="جرب البحث بكلمات مختلفة" data-en="Try searching with different words">جرب البحث بكلمات مختلفة</p>
                </div>
            `;
            return;
        }

        filteredProjects.forEach((project, index) => {
            const projectElement = this.createProjectElement(project, index);
            projectsContainer.appendChild(projectElement);
        });
    }

    // فتح modal المشروع
    openProjectModal(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }

        // إنشاء modal لعرض تفاصيل المشروع
        this.createProjectModal(project);
    }

    // إنشاء modal المشروع
    createProjectModal(project) {
        // إزالة modal موجود
        const existingModal = document.querySelector('.project-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const title = this.currentLanguage === 'ar' ? project.title_ar : project.title_en;
        const description = this.currentLanguage === 'ar' ? project.description_ar : project.description_en;
        const tags = this.currentLanguage === 'ar' ? project.tags : project.tags_en;

        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 data-ar="${project.title_ar}" data-en="${project.title_en}">${title}</h2>
                    <button class="modal-close" onclick="projectsManager.closeProjectModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="project-gallery">
                        ${project.images.map((image, index) => `
                            <div class="gallery-item ${index === 0 ? 'active' : ''}">
                                <img src="${image}" alt="${title} - ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                    <div class="project-details">
                        <p class="project-description" data-ar="${project.description_ar}" data-en="${project.description_en}">${description}</p>
                        <div class="project-tags">
                            ${tags.map(tag => `<span class="tag" data-ar="${tag}" data-en="${tag}">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // إضافة CSS للمodal
        this.addModalStyles();
        
        // إعداد معرض الصور
        this.setupGallery(modal);
    }

    // إضافة أنماط CSS للمModal
    addModalStyles() {
        if (document.getElementById('modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 10px;
                max-width: 90%;
                max-height: 90%;
                overflow: auto;
                z-index: 10000;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #eee;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .project-gallery {
                margin-bottom: 20px;
            }
            
            .gallery-item {
                display: none;
            }
            
            .gallery-item.active {
                display: block;
            }
            
            .gallery-item img {
                width: 100%;
                height: auto;
                border-radius: 5px;
            }
        `;
        
        document.head.appendChild(style);
    }

    // إعداد معرض الصور
    setupGallery(modal) {
        const galleryItems = modal.querySelectorAll('.gallery-item');
        let currentIndex = 0;

        // إضافة أزرار التنقل
        const gallery = modal.querySelector('.project-gallery');
        const navButtons = document.createElement('div');
        navButtons.className = 'gallery-nav';
        navButtons.innerHTML = `
            <button class="nav-btn prev" onclick="projectsManager.navigateGallery(${currentIndex}, -1)">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="nav-btn next" onclick="projectsManager.navigateGallery(${currentIndex}, 1)">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        gallery.appendChild(navButtons);
    }

    // التنقل في معرض الصور
    navigateGallery(currentIndex, direction) {
        const modal = document.querySelector('.project-modal');
        if (!modal) return;

        const galleryItems = modal.querySelectorAll('.gallery-item');
        const newIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;

        galleryItems[currentIndex].classList.remove('active');
        galleryItems[newIndex].classList.add('active');

        // تحديث أزرار التنقل
        const prevBtn = modal.querySelector('.nav-btn.prev');
        const nextBtn = modal.querySelector('.nav-btn.next');
        
        if (prevBtn) prevBtn.onclick = () => this.navigateGallery(newIndex, -1);
        if (nextBtn) nextBtn.onclick = () => this.navigateGallery(newIndex, 1);
    }

    // إغلاق modal المشروع
    closeProjectModal() {
        const modal = document.querySelector('.project-modal');
        if (modal) {
            modal.remove();
        }
    }

    // تكبير الصورة
    zoomImage(imageSrc) {
        const modal = document.createElement('div');
        modal.className = 'image-zoom-modal';
        modal.innerHTML = `
            <div class="zoom-overlay"></div>
            <div class="zoom-content">
                <img src="${imageSrc}" alt="Zoomed Image">
                <button class="zoom-close" onclick="projectsManager.closeZoomModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        
        // إضافة أنماط CSS
        this.addZoomStyles();
    }

    // إضافة أنماط CSS للتكبير
    addZoomStyles() {
        if (document.getElementById('zoom-styles')) return;

        const style = document.createElement('style');
        style.id = 'zoom-styles';
        style.textContent = `
            .image-zoom-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .zoom-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
            }
            
            .zoom-content {
                position: relative;
                z-index: 10000;
            }
            
            .zoom-content img {
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            }
            
            .zoom-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
            }
        `;
        
        document.head.appendChild(style);
    }

    // إغلاق modal التكبير
    closeZoomModal() {
        const modal = document.querySelector('.image-zoom-modal');
        if (modal) {
            modal.remove();
        }
    }
}

// إنشاء instance من مدير المشاريع
const projectsManager = new ProjectsManager();

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    projectsManager.init();
});

// تصدير للاستخدام في ملفات أخرى
window.projectsManager = projectsManager;
