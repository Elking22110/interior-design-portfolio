const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const SupabaseService = require('../src/supabase-service');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../src')));

// Initialize Supabase service
const dbService = new SupabaseService();

console.log('🚀 MG Designs API Server Started');
console.log('📊 Database:', dbService.isConfigured ? 'Supabase' : 'Local JSON');

// Routes

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

// Admin pages
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/admin-enhanced.html"));
});

app.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/admin-login.html'));
});

app.get('/admin-enhanced', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/admin-enhanced.html'));
});

// Contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/contact.html'));
});

// Project details page
app.get('/project-details', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/project-details.html'));
});

// API Routes

// Projects API
app.get('/api/projects', async (req, res) => {
    try {
        let projects = await dbService.getProjects();
        
        // Apply filters
        const { category_id, featured } = req.query;
        if (category_id && category_id !== 'all') {
            projects = projects.filter(p => p.category_id === category_id);
        }
        if (featured === 'true') {
            projects = projects.filter(p => p.featured === true);
        }
        
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/projects/category/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        let projects = await dbService.getProjectsByCategory(categoryId);
        
        // Filter by active status if specified
        if (req.query.active !== undefined) {
            projects = projects.filter(p => p.active === (req.query.active === 'true'));
        }
        
        // Sort by order if available
        projects.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        console.log(`جلب مشاريع القسم ${categoryId}: عدد ${projects.length} مشروع`);
        
        // Add no-cache headers
        res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/projects/:id', async (req, res) => {
    try {
        const projects = await dbService.getProjects();
        const project = projects.find(p => p.id == req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/projects', async (req, res) => {
    try {
        // Validation
        const { title_ar, description_ar, category_id } = req.body;
        
        if (!title_ar || !title_ar.trim()) {
            return res.status(400).json({ error: 'عنوان المشروع مطلوب' });
        }
        
        if (!description_ar || !description_ar.trim()) {
            return res.status(400).json({ error: 'وصف المشروع مطلوب' });
        }
        
        if (!category_id) {
            return res.status(400).json({ error: 'قسم المشروع مطلوب' });
        }
        
        // Check if category exists
        const categories = await dbService.getCategories();
        const category = categories.find(c => c.id == category_id);
        if (!category) {
            return res.status(400).json({ error: 'القسم المحدد غير موجود' });
        }
        
        const projectData = {
            title_ar: title_ar.trim(),
            description_ar: description_ar.trim(),
            category_id: category_id,
            images: Array.isArray(req.body.images) ? req.body.images : [],
            featured: Boolean(req.body.featured),
            active: req.body.active !== false,
            order: parseInt(req.body.order) || 0
        };
        
        const project = await dbService.addProject(projectData);
        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    try {
        // Validation for updates
        const { title_ar, description_ar, category_id } = req.body;
        
        if (title_ar !== undefined && (!title_ar || !title_ar.trim())) {
            return res.status(400).json({ error: 'عنوان المشروع مطلوب' });
        }
        
        if (description_ar !== undefined && (!description_ar || !description_ar.trim())) {
            return res.status(400).json({ error: 'وصف المشروع مطلوب' });
        }
        
        if (category_id !== undefined) {
            const categories = await dbService.getCategories();
            const category = categories.find(c => c.id == category_id);
            if (!category) {
                return res.status(400).json({ error: 'القسم المحدد غير موجود' });
            }
        }
        
        const updateData = {};
        if (title_ar !== undefined) updateData.title_ar = title_ar.trim();
        if (description_ar !== undefined) updateData.description_ar = description_ar.trim();
        if (category_id !== undefined) updateData.category_id = category_id;
        if (req.body.images !== undefined) updateData.images = Array.isArray(req.body.images) ? req.body.images : [];
        if (req.body.featured !== undefined) updateData.featured = Boolean(req.body.featured);
        if (req.body.active !== undefined) updateData.active = req.body.active !== false;
        if (req.body.order !== undefined) updateData.order = parseInt(req.body.order) || 0;
        
        const updatedProject = await dbService.updateProject(req.params.id, updateData);
        res.json(updatedProject);
    } catch (error) {
        if (error.message === 'Project not found') {
            return res.status(404).json({ error: 'المشروع غير موجود' });
        }
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        await dbService.deleteProject(req.params.id);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        if (error.message === 'Project not found') {
            return res.status(404).json({ error: 'Project not found' });
        }
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Consultations API
app.get('/api/consultations', async (req, res) => {
    try {
        const consultations = await dbService.getConsultations();
        res.json(consultations);
    } catch (error) {
        console.error('Error fetching consultations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/consultations', async (req, res) => {
    try {
        const consultation = await dbService.addConsultation(req.body);
        res.status(201).json(consultation);
    } catch (error) {
        console.error('Error creating consultation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/consultations/:id', async (req, res) => {
    try {
        const updatedConsultation = await dbService.updateConsultation(req.params.id, req.body);
        res.json(updatedConsultation);
    } catch (error) {
        if (error.message === 'Consultation not found') {
            return res.status(404).json({ error: 'الاستشارة غير موجودة' });
        }
        console.error('Error updating consultation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/api/consultations/:id', async (req, res) => {
    try {
        const updatedConsultation = await dbService.updateConsultation(req.params.id, req.body);
        res.json(updatedConsultation);
    } catch (error) {
        if (error.message === 'Consultation not found') {
            return res.status(404).json({ error: 'الاستشارة غير موجودة' });
        }
        console.error('Error updating consultation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/consultations/:id', async (req, res) => {
    try {
        const deletedConsultation = await dbService.deleteConsultation(req.params.id);
        res.json({ 
            message: 'تم حذف الاستشارة بنجاح', 
            deleted: deletedConsultation 
        });
    } catch (error) {
        if (error.message === 'Consultation not found') {
            return res.status(404).json({ error: 'الاستشارة غير موجودة' });
        }
        console.error('Error deleting consultation:', error);
        res.status(500).json({ error: 'خطأ في حذف الاستشارة' });
    }
});

// Users API
app.get('/api/users', async (req, res) => {
    try {
        const users = await dbService.getUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const users = await dbService.getUsers();
        const user = users.find(u => u.id == req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        // Validation
        const { name, username, password, role } = req.body;
        
        if (!name || !name.trim() || name.trim().length < 2) {
            return res.status(400).json({ error: 'اسم المستخدم مطلوب (على الأقل حرفين)' });
        }
        
        if (!username || !username.trim() || username.trim().length < 3) {
            return res.status(400).json({ error: 'اسم المستخدم للدخول مطلوب (على الأقل 3 أحرف)' });
        }
        
        if (!password || !password.trim() || password.trim().length < 6) {
            return res.status(400).json({ error: 'كلمة المرور مطلوبة (على الأقل 6 أحرف)' });
        }
        
        // Additional validation
        if (username.trim().includes(' ')) {
            return res.status(400).json({ error: 'اسم المستخدم لا يجب أن يحتوي على مسافات' });
        }
        
        if (!role || !role.trim()) {
            return res.status(400).json({ error: 'دور المستخدم مطلوب' });
        }
        
        // Check if username already exists
        const users = await dbService.getUsers();
        const existingUser = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());
        if (existingUser) {
            return res.status(400).json({ error: 'اسم المستخدم مستخدم بالفعل' });
        }
        
        // Validate role
        const validRoles = ['superadmin', 'admin', 'editor', 'viewer'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ error: 'دور المستخدم غير صحيح' });
        }
        
        // Set default permissions based on role
        let permissions = [];
        switch (role) {
            case 'superadmin':
                permissions = ['add_category', 'edit_category', 'delete_category', 'add_project', 'edit_project', 'delete_project', 'add_image', 'edit_image', 'delete_image', 'projects', 'consultations', 'settings', 'users'];
                break;
            case 'admin':
                permissions = ['add_category', 'edit_category', 'add_project', 'edit_project', 'projects', 'consultations'];
                break;
            case 'editor':
                permissions = ['add_project', 'edit_project', 'projects'];
                break;
            case 'viewer':
                permissions = ['projects', 'consultations'];
                break;
        }
        
        const userData = {
            name: name.trim(),
            username: username.trim(),
            password: password.trim(), // In production, this should be hashed
            role: role,
            permissions: permissions,
            active: req.body.active !== false
        };
        
        const user = await dbService.addUser(userData);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/api/users/:id', async (req, res) => {
    try {
        // Validation for updates
        const { name, username, password, role } = req.body;
        
        if (name !== undefined && (!name || !name.trim() || name.trim().length < 2)) {
            return res.status(400).json({ error: 'اسم المستخدم مطلوب (على الأقل حرفين)' });
        }
        
        if (username !== undefined && (!username || !username.trim() || username.trim().length < 3)) {
            return res.status(400).json({ error: 'اسم المستخدم للدخول مطلوب (على الأقل 3 أحرف)' });
        }
        
        if (password !== undefined && (!password || !password.trim() || password.trim().length < 6)) {
            return res.status(400).json({ error: 'كلمة المرور مطلوبة (على الأقل 6 أحرف)' });
        }
        
        // Additional validation for username
        if (username !== undefined && username.trim().includes(' ')) {
            return res.status(400).json({ error: 'اسم المستخدم لا يجب أن يحتوي على مسافات' });
        }
        
        if (role !== undefined && (!role || !role.trim())) {
            return res.status(400).json({ error: 'دور المستخدم مطلوب' });
        }
        
        // Check if username already exists (excluding current user)
        if (username !== undefined) {
            const users = await dbService.getUsers();
            const existingUser = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase() && u.id != req.params.id);
            if (existingUser) {
                return res.status(400).json({ error: 'اسم المستخدم مستخدم بالفعل' });
            }
        }
        
        // Validate role
        if (role !== undefined) {
            const validRoles = ['superadmin', 'admin', 'editor', 'viewer'];
            if (!validRoles.includes(role)) {
                return res.status(400).json({ error: 'دور المستخدم غير صحيح' });
            }
        }
        
        const updateData = {};
        if (name !== undefined) updateData.name = name.trim();
        if (username !== undefined) updateData.username = username.trim();
        if (password !== undefined) updateData.password = password.trim();
        if (role !== undefined) {
            updateData.role = role;
            // Update permissions based on new role
            let permissions = [];
            switch (role) {
                case 'superadmin':
                    permissions = ['add_category', 'edit_category', 'delete_category', 'add_project', 'edit_project', 'delete_project', 'add_image', 'edit_image', 'delete_image', 'projects', 'consultations', 'settings', 'users'];
                    break;
                case 'admin':
                    permissions = ['add_category', 'edit_category', 'add_project', 'edit_project', 'projects', 'consultations'];
                    break;
                case 'editor':
                    permissions = ['add_project', 'edit_project', 'projects'];
                    break;
                case 'viewer':
                    permissions = ['projects', 'consultations'];
                    break;
            }
            updateData.permissions = permissions;
        }
        if (req.body.active !== undefined) updateData.active = req.body.active !== false;
        
        const updatedUser = await dbService.updateUser(req.params.id, updateData);
        res.json(updatedUser);
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ error: 'المستخدم غير موجود' });
        }
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const users = await dbService.getUsers();
        const userToDelete = users.find(u => u.id == req.params.id);
        
        if (!userToDelete) {
            return res.status(404).json({ error: 'المستخدم غير موجود' });
        }
        
        // Prevent deletion of superadmin users
        if (userToDelete.role === 'superadmin') {
            return res.status(400).json({ error: 'لا يمكن حذف المستخدمين ذوي الصلاحيات العليا' });
        }
        
        // Check if this is the only admin user
        const adminUsers = users.filter(u => u.role === 'admin' || u.role === 'superadmin');
        if (adminUsers.length === 1 && userToDelete.role === 'admin') {
            return res.status(400).json({ error: 'لا يمكن حذف آخر مستخدم إداري في النظام' });
        }
        
        const deletedUser = await dbService.deleteUser(req.params.id);
        res.json({ message: 'تم حذف المستخدم بنجاح', deleted: deletedUser });
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ error: 'المستخدم غير موجود' });
        }
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Categories API
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await dbService.getCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/categories', async (req, res) => {
    try {
        // Validation
        const { name_ar, name_en, slug } = req.body;
        
        if (!name_ar || !name_ar.trim()) {
            return res.status(400).json({ error: 'اسم القسم (عربي) مطلوب' });
        }
        
        if (!name_en || !name_en.trim()) {
            return res.status(400).json({ error: 'اسم القسم (إنجليزي) مطلوب' });
        }
        
        if (!slug || !slug.trim()) {
            return res.status(400).json({ error: 'الرابط المختصر مطلوب' });
        }
        
        // Check if slug already exists
        const categories = await dbService.getCategories();
        const existingCategory = categories.find(c => c.slug === slug.trim());
        if (existingCategory) {
            return res.status(400).json({ error: 'الرابط المختصر مستخدم بالفعل' });
        }
        
        const categoryData = {
            name_ar: name_ar.trim(),
            name_en: name_en.trim(),
            slug: slug.trim(),
            description_ar: req.body.description_ar ? req.body.description_ar.trim() : '',
            description_en: req.body.description_en ? req.body.description_en.trim() : '',
            image: req.body.image || '',
            order: parseInt(req.body.order) || 0,
            active: req.body.active !== false
        };
        
        const category = await dbService.addCategory(categoryData);
        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/categories/:id', async (req, res) => {
    try {
        // Validation for updates
        const { name_ar, name_en, slug } = req.body;
        
        if (name_ar !== undefined && (!name_ar || !name_ar.trim())) {
            return res.status(400).json({ error: 'اسم القسم (عربي) مطلوب' });
        }
        
        if (name_en !== undefined && (!name_en || !name_en.trim())) {
            return res.status(400).json({ error: 'اسم القسم (إنجليزي) مطلوب' });
        }
        
        if (slug !== undefined && (!slug || !slug.trim())) {
            return res.status(400).json({ error: 'الرابط المختصر مطلوب' });
        }
        
        // Check if slug already exists (excluding current category)
        if (slug !== undefined) {
            const categories = await dbService.getCategories();
            const existingCategory = categories.find(c => c.slug === slug.trim() && c.id != req.params.id);
            if (existingCategory) {
                return res.status(400).json({ error: 'الرابط المختصر مستخدم بالفعل' });
            }
        }
        
        const updateData = {};
        if (name_ar !== undefined) updateData.name_ar = name_ar.trim();
        if (name_en !== undefined) updateData.name_en = name_en.trim();
        if (slug !== undefined) updateData.slug = slug.trim();
        if (req.body.description_ar !== undefined) updateData.description_ar = req.body.description_ar.trim();
        if (req.body.description_en !== undefined) updateData.description_en = req.body.description_en.trim();
        if (req.body.image !== undefined) updateData.image = req.body.image;
        if (req.body.order !== undefined) updateData.order = parseInt(req.body.order) || 0;
        if (req.body.active !== undefined) updateData.active = req.body.active !== false;
        
        const updatedCategory = await dbService.updateCategory(req.params.id, updateData);
        res.json(updatedCategory);
    } catch (error) {
        if (error.message === 'Category not found') {
            return res.status(404).json({ error: 'القسم غير موجود' });
        }
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/categories/:id', async (req, res) => {
    try {
        // Check if category has projects
        const projects = await dbService.getProjects();
        const projectsInCategory = projects.filter(p => p.category_id == req.params.id);
        if (projectsInCategory.length > 0) {
            return res.status(400).json({ 
                error: `لا يمكن حذف هذا القسم لأنه يحتوي على ${projectsInCategory.length} مشروع. يرجى نقل المشاريع إلى قسم آخر أولاً.` 
            });
        }
        
        const deletedCategory = await dbService.deleteCategory(req.params.id);
        res.json({ message: 'تم حذف القسم بنجاح', deleted: deletedCategory });
    } catch (error) {
        if (error.message === 'Category not found') {
            return res.status(404).json({ error: 'القسم غير موجود' });
        }
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Stats API
app.get('/api/stats', async (req, res) => {
    try {
        const stats = await dbService.getStats();
        res.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
