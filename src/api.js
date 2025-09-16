// API Configuration - Using Local Node.js Backend
const API_BASE_URL = '/api';

// استيراد البيانات الثابتة إذا لم تكن معرفة (للاستخدام fallback)
// تأكد أن staticProjects, staticCategories, staticStats معرفة في static-data.js

// API Helper Functions
class MGDesignsAPI {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.useStaticData = false; // افتراضيًا استخدم API حقيقي
    }

    async request(endpoint, options = {}) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const response = await fetch(url, options);
            if (!response.ok) throw new Error('API error');
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            // استخدام البيانات المحلية كـ fallback
            return this.getLocalData(endpoint);
        }
    }

    // الحصول على البيانات المحلية كـ fallback
    getLocalData(endpoint) {
        if (endpoint.includes('/projects')) {
            return this.getLocalProjects();
        } else if (endpoint.includes('/categories')) {
            return this.getLocalCategories();
        } else if (endpoint.includes('/stats')) {
            return this.getLocalStats();
        } else if (endpoint.includes('/consultations')) {
            return [];
        }
        return null;
    }

    // الحصول على المشاريع المحلية
    getLocalProjects() {
        try {
            // محاولة قراءة من localStorage أولاً
            const localProjects = localStorage.getItem('mg_projects');
            if (localProjects) {
                return JSON.parse(localProjects);
            }
            
            // إذا لم توجد في localStorage، استخدم البيانات الثابتة
            if (typeof staticProjects !== 'undefined') {
                return staticProjects;
            }
            
            // إذا لم توجد البيانات الثابتة، استخدم مصفوفة فارغة
            console.warn('Static projects not found, using empty array');
            return [];
        } catch (error) {
            console.error('Error loading local projects:', error);
            return [];
        }
    }

    // الحصول على الأقسام المحلية
    getLocalCategories() {
        try {
            const localCategories = localStorage.getItem('mg_categories');
            if (localCategories) {
                return JSON.parse(localCategories);
            }
            
            // إذا لم توجد في localStorage، استخدم البيانات الثابتة
            if (typeof staticCategories !== 'undefined') {
                return staticCategories;
            }
            
            // إذا لم توجد البيانات الثابتة، استخدم مصفوفة فارغة
            console.warn('Static categories not found, using empty array');
            return [];
        } catch (error) {
            console.error('Error loading local categories:', error);
            return [];
        }
    }

    // الحصول على الإحصائيات المحلية
    getLocalStats() {
        try {
            const localStats = localStorage.getItem('mg_stats');
            if (localStats) {
                return JSON.parse(localStats);
            }
            return staticStats || { projects: 0, users: 0, consultations: 0 };
        } catch (error) {
            console.error('Error loading local stats:', error);
            return { projects: 0, users: 0, consultations: 0 };
        }
    }

    // Projects API
    async getProjects(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`/projects?${params}`);
    }

    async getProjectsByCategory(categoryId) {
        return this.request(`/projects/category/${categoryId}`);
    }

    async getProject(id) {
        return this.request(`/projects/${id}`);
    }

    async createProject(projectData) {
        const result = await this.request('/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        });
        
        // تحديث البيانات المحلية
        if (result) {
            this.updateLocalProjects();
        }
        return result;
    }

    async updateProject(id, projectData) {
        const result = await this.request(`/projects/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        });
        
        // تحديث البيانات المحلية
        if (result) {
            this.updateLocalProjects();
        }
        return result;
    }

    async deleteProject(id) {
        const result = await this.request(`/projects/${id}`, {
            method: 'DELETE'
        });
        
        // تحديث البيانات المحلية
        if (result) {
            this.updateLocalProjects();
        }
        return result;
    }

    // Categories API
    async getCategories() {
        return this.request('/categories');
    }

    async getCategory(id) {
        return this.request(`/categories/${id}`);
    }

    async createCategory(categoryData) {
        const result = await this.request('/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryData)
        });
        
        // تحديث البيانات المحلية
        if (result) {
            this.updateLocalCategories();
        }
        return result;
    }

    async updateCategory(id, categoryData) {
        const result = await this.request(`/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryData)
        });
        
        // تحديث البيانات المحلية
        if (result) {
            this.updateLocalCategories();
        }
        return result;
    }

    async deleteCategory(id) {
        const result = await this.request(`/categories/${id}`, {
            method: 'DELETE'
        });
        
        // تحديث البيانات المحلية
        if (result) {
            this.updateLocalCategories();
        }
        return result;
    }

    // تحديث البيانات المحلية
    async updateLocalProjects() {
        try {
            const projects = await this.getProjects();
            localStorage.setItem('mg_projects', JSON.stringify(projects));
        } catch (error) {
            console.error('Error updating local projects:', error);
        }
    }

    async updateLocalCategories() {
        try {
            const categories = await this.getCategories();
            localStorage.setItem('mg_categories', JSON.stringify(categories));
        } catch (error) {
            console.error('Error updating local categories:', error);
        }
    }

    // Consultations API
    async getConsultations() {
        return this.request('/consultations');
    }

    async createConsultation(consultationData) {
        return this.request('/consultations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consultationData)
        });
    }

    async updateConsultationStatus(id, status) {
        return this.request(`/consultations/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
    }

    // Stats API
    async getStats() {
        try {
            const response = await fetch(`${API_BASE_URL}/stats`);
            const stats = await response.json();
            if (!stats || typeof stats !== 'object') {
                return this.getLocalStats();
            }
            return stats;
        } catch (error) {
            return this.getLocalStats();
        }
    }

    // File Upload API
    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        
        return this.request('/upload', {
            method: 'POST',
            body: formData
        });
    }
}

// إنشاء instance من API
const api = new MGDesignsAPI();

// Functions for Portfolio
async function loadPortfolioProjects(categoryId = null) {
    try {
        const projects = categoryId 
            ? await api.getProjectsByCategory(categoryId)
            : await api.getProjects();
        
        updatePortfolioGrid(projects);
        updatePortfolioFilters(projects);
    } catch (error) {
        console.error('Error loading portfolio projects:', error);
        showErrorMessage('حدث خطأ في تحميل المشاريع');
    }
}

function updatePortfolioGrid(projects) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;

    portfolioGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectElement = createProjectElement(project, index);
        portfolioGrid.appendChild(projectElement);
    });
}

function createProjectElement(project, index = 0) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-card';
    projectDiv.setAttribute('data-aos', 'fade-up');
    projectDiv.setAttribute('data-aos-delay', (index * 100).toString());
    
    const currentLang = document.documentElement.lang || 'ar';
    const title = currentLang === 'ar' ? project.title_ar : project.title_en;
    const description = currentLang === 'ar' ? project.description_ar : project.description_en;
    const tags = currentLang === 'ar' ? project.tags : project.tags_en;
    
    projectDiv.innerHTML = `
        <div class="project-image">
            <img src="${project.images[0]}" alt="${title}" class="project-img">
            <div class="project-overlay">
                <div class="project-actions">
                    <button class="action-btn view-btn" onclick="openProjectModal('${project.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn zoom-btn" onclick="zoomImage('${project.images[0]}')">
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

function updatePortfolioFilters(projects) {
    // يمكن إضافة فلترة حسب النوع أو التصنيف هنا
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                filterProjects(filter, projects);
            });
        });
    }
}

function filterProjects(filter, allProjects) {
    let filteredProjects = allProjects;
    
    if (filter && filter !== 'all') {
        filteredProjects = allProjects.filter(project => 
            project.category_id === filter || 
            project.tags.includes(filter) ||
            project.tags_en.includes(filter)
        );
    }
    
    updatePortfolioGrid(filteredProjects);
}

// Contact Form Handler
async function handleContactForm(formData) {
    try {
        const consultationData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message'),
            created_at: new Date().toISOString()
        };
        
        const result = await api.createConsultation(consultationData);
        if (result) {
            showSuccessMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            document.getElementById('contactForm').reset();
        }
    } catch (error) {
        console.error('Error sending consultation:', error);
        showErrorMessage('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    }
}

// Stats Loading
async function loadStats() {
    try {
        const stats = await api.getStats();
        updateStatsDisplay(stats);
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

function updateStatsDisplay(stats) {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const count = stat.getAttribute('data-count');
        if (count && stats) {
            const value = stats[count.toLowerCase()] || 0;
            animateCounter(stat, value);
        }
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Project Modal Functions
function openProjectModal(projectId) {
    // يمكن إضافة modal لعرض تفاصيل المشروع
    console.log('Opening project modal for ID:', projectId);
}

function zoomImage(imageSrc) {
    // يمكن إضافة modal لعرض الصورة بحجم أكبر
    console.log('Zooming image:', imageSrc);
}

// Utility Functions
function showSuccessMessage(message) {
    // إظهار رسالة نجاح
    console.log('Success:', message);
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    // إظهار رسالة خطأ
    console.error('Error:', message);
    showNotification(message, 'error');
}

// Notification function
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // إضافة الأنماط
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        font-family: 'Cairo', sans-serif;
        animation: slideIn 0.3s ease-out;
    `;
    
    // إضافة CSS للحركة
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                margin-left: 15px;
                float: right;
            }
        `;
        document.head.appendChild(style);
    }
    
    // إضافة إلى الصفحة
    document.body.appendChild(notification);
    
    // إغلاق الإشعار
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.onclick = () => notification.remove();
    
    // إزالة تلقائياً بعد 5 ثواني
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // تحميل المشاريع عند تحميل الصفحة
    loadPortfolioProjects();
    
    // تحميل الإحصائيات
    loadStats();
    
    // ملاحظة: نموذج الاتصال يتم التعامل معه في script.js
    // لتجنب التكرار
});

