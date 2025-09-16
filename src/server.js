const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Load database
let db = {};
try {
    db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
    console.log('Database loaded successfully!');
    console.log('Projects:', db.projects?.length || 0);
    console.log('Categories:', db.categories?.length || 0);
    console.log('Consultations:', db.consultations?.length || 0);
} catch (error) {
    console.log('Loading default database structure...');
    db = {
        users: [
            {
                "id": "1",
                "name": "Hassan Elking",
                "username": "Hassan Elking",
                "password": "HassanElking221100",
                "role": "superadmin",
                "permissions": [
                    "add_category",
                    "edit_category",
                    "delete_category",
                    "add_project",
                    "edit_project",
                    "delete_project",
                    "add_image",
                    "edit_image",
                    "delete_image",
                    "projects",
                    "consultations",
                    "settings",
                    "users"
                ]
            }
        ],
        categories: [
            {
                "id": "1",
                "name_ar": "تصميمات مطابخ خشبية",
                "name_en": "Wooden Kitchen Designs",
                "slug": "wooden-kitchens",
                "description_ar": "تصميمات مطابخ خشبية عصرية وأنيقة",
                "description_en": "Modern and elegant wooden kitchen designs",
                "image": "images/new-kitchen-1.jpg",
                "order": 1,
                "active": true,
                "created_at": "2024-01-01T00:00:00Z"
            }
        ],
        projects: [],
        consultations: [],
        stats: {
            projects: 0,
            categories: 1,
            consultations: 0
        }
    };
}

// Save database function
function saveDB() {
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(db, null, 2));
}

// Routes

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin pages
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "admin-enhanced.html"));
});

app.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-login.html'));
});

app.get('/admin-enhanced', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-enhanced.html'));
});

// Contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Project details page
app.get('/project-details', (req, res) => {
    res.sendFile(path.join(__dirname, 'project-details.html'));
});

// API Routes

// Projects API
app.get('/api/projects', (req, res) => {
    try {
        let projects = db.projects || [];
        
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
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/projects/category/:categoryId', (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        let projects = db.projects.filter(p => p.category_id == categoryId) || [];
        
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

app.get('/api/projects/:id', (req, res) => {
    try {
        const project = db.projects.find(p => p.id == req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/projects', (req, res) => {
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
        const category = db.categories.find(c => c.id == category_id);
        if (!category) {
            return res.status(400).json({ error: 'القسم المحدد غير موجود' });
        }
        
        const project = {
            id: Date.now().toString(),
            title_ar: title_ar.trim(),
            description_ar: description_ar.trim(),
            category_id: category_id,
            images: Array.isArray(req.body.images) ? req.body.images : [],
            featured: Boolean(req.body.featured),
            active: req.body.active !== false,
            order: parseInt(req.body.order) || 0,
            created_at: new Date().toISOString()
        };
        
        db.projects.push(project);
        saveDB();
        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/projects/:id', (req, res) => {
    try {
        const index = db.projects.findIndex(p => p.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'المشروع غير موجود' });
        }
        
        // Validation for updates
        const { title_ar, description_ar, category_id } = req.body;
        
        if (title_ar !== undefined && (!title_ar || !title_ar.trim())) {
            return res.status(400).json({ error: 'عنوان المشروع مطلوب' });
        }
        
        if (description_ar !== undefined && (!description_ar || !description_ar.trim())) {
            return res.status(400).json({ error: 'وصف المشروع مطلوب' });
        }
        
        if (category_id !== undefined) {
            const category = db.categories.find(c => c.id == category_id);
            if (!category) {
                return res.status(400).json({ error: 'القسم المحدد غير موجود' });
            }
        }
        
        // Update project with validation
        const updatedProject = { ...db.projects[index] };
        
        if (title_ar !== undefined) updatedProject.title_ar = title_ar.trim();
        if (description_ar !== undefined) updatedProject.description_ar = description_ar.trim();
        if (category_id !== undefined) updatedProject.category_id = category_id;
        if (req.body.images !== undefined) updatedProject.images = Array.isArray(req.body.images) ? req.body.images : [];
        if (req.body.featured !== undefined) updatedProject.featured = Boolean(req.body.featured);
        if (req.body.active !== undefined) updatedProject.active = req.body.active !== false;
        if (req.body.order !== undefined) updatedProject.order = parseInt(req.body.order) || 0;
        
        updatedProject.updated_at = new Date().toISOString();
        
        db.projects[index] = updatedProject;
        saveDB();
        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/projects/:id', (req, res) => {
    try {
        const index = db.projects.findIndex(p => p.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Project not found' });
        }
        db.projects.splice(index, 1);
        saveDB();
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Consultations API
app.get('/api/consultations', (req, res) => {
    try {
        res.json(db.consultations || []);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/consultations', (req, res) => {
    try {
        const consultation = {
            id: Date.now().toString(),
            ...req.body,
            status: 'pending',
            created_at: new Date().toISOString()
        };
        db.consultations.push(consultation);
        saveDB();
        res.status(201).json(consultation);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/consultations/:id', (req, res) => {
    try {
        const index = db.consultations.findIndex(c => c.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Consultation not found' });
        }
        db.consultations[index] = { ...db.consultations[index], ...req.body, updated_at: new Date().toISOString() };
        saveDB();
        res.json(db.consultations[index]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/api/consultations/:id', (req, res) => {
    try {
        const index = db.consultations.findIndex(c => c.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Consultation not found' });
        }
        db.consultations[index] = { ...db.consultations[index], ...req.body, updated_at: new Date().toISOString() };
        saveDB();
        console.log(`تم تحديث الاستشارة: ${db.consultations[index].id} - الحالة: ${db.consultations[index].status}`);
        res.json(db.consultations[index]);
    } catch (error) {
        console.error('Error updating consultation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/consultations/:id', (req, res) => {
    try {
        const index = db.consultations.findIndex(c => c.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Consultation not found' });
        }
        const deletedConsultation = db.consultations.splice(index, 1)[0];
        saveDB();
        console.log(`تم حذف الاستشارة: ${deletedConsultation.id} - ${deletedConsultation.name}`);
        res.json({ message: 'Consultation deleted successfully', deleted: deletedConsultation });
    } catch (error) {
        console.error('Error deleting consultation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Users API
app.get('/api/users', (req, res) => {
    try {
        res.json(db.users || []);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/users/:id', (req, res) => {
    try {
        const user = db.users.find(u => u.id == req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/users', (req, res) => {
    try {
        // Validation
        const { name, username, password, role } = req.body;
        
        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'اسم المستخدم مطلوب' });
        }
        
        if (!username || !username.trim()) {
            return res.status(400).json({ error: 'اسم المستخدم للدخول مطلوب' });
        }
        
        if (!password || !password.trim()) {
            return res.status(400).json({ error: 'كلمة المرور مطلوبة' });
        }
        
        if (!role || !role.trim()) {
            return res.status(400).json({ error: 'دور المستخدم مطلوب' });
        }
        
        // Check if username already exists
        const existingUser = db.users.find(u => u.username === username.trim());
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
        
        const user = {
            id: Date.now().toString(),
            name: name.trim(),
            username: username.trim(),
            password: password.trim(), // In production, this should be hashed
            role: role,
            permissions: permissions,
            active: true,
            created_at: new Date().toISOString()
        };
        
        db.users.push(user);
        saveDB();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/api/users/:id', (req, res) => {
    try {
        const index = db.users.findIndex(u => u.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'المستخدم غير موجود' });
        }
        
        // Validation for updates
        const { name, username, password, role } = req.body;
        
        if (name !== undefined && (!name || !name.trim())) {
            return res.status(400).json({ error: 'اسم المستخدم مطلوب' });
        }
        
        if (username !== undefined && (!username || !username.trim())) {
            return res.status(400).json({ error: 'اسم المستخدم للدخول مطلوب' });
        }
        
        if (password !== undefined && (!password || !password.trim())) {
            return res.status(400).json({ error: 'كلمة المرور مطلوبة' });
        }
        
        if (role !== undefined && (!role || !role.trim())) {
            return res.status(400).json({ error: 'دور المستخدم مطلوب' });
        }
        
        // Check if username already exists (excluding current user)
        if (username !== undefined) {
            const existingUser = db.users.find(u => u.username === username.trim() && u.id != req.params.id);
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
        
        // Update user with validation
        const updatedUser = { ...db.users[index] };
        
        if (name !== undefined) updatedUser.name = name.trim();
        if (username !== undefined) updatedUser.username = username.trim();
        if (password !== undefined) updatedUser.password = password.trim();
        if (role !== undefined) {
            updatedUser.role = role;
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
            updatedUser.permissions = permissions;
        }
        if (req.body.active !== undefined) updatedUser.active = req.body.active !== false;
        
        updatedUser.updated_at = new Date().toISOString();
        
        db.users[index] = updatedUser;
        saveDB();
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/users/:id', (req, res) => {
    try {
        const index = db.users.findIndex(u => u.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'المستخدم غير موجود' });
        }
        
        const userToDelete = db.users[index];
        
        // Prevent deletion of superadmin users
        if (userToDelete.role === 'superadmin') {
            return res.status(400).json({ error: 'لا يمكن حذف المستخدمين ذوي الصلاحيات العليا' });
        }
        
        // Check if this is the only admin user
        const adminUsers = db.users.filter(u => u.role === 'admin' || u.role === 'superadmin');
        if (adminUsers.length === 1 && userToDelete.role === 'admin') {
            return res.status(400).json({ error: 'لا يمكن حذف آخر مستخدم إداري في النظام' });
        }
        
        const deletedUser = db.users.splice(index, 1)[0];
        saveDB();
        res.json({ message: 'تم حذف المستخدم بنجاح', deleted: deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Categories API
app.get('/api/categories', (req, res) => {
    try {
        res.json(db.categories || []);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/categories', (req, res) => {
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
        const existingCategory = db.categories.find(c => c.slug === slug.trim());
        if (existingCategory) {
            return res.status(400).json({ error: 'الرابط المختصر مستخدم بالفعل' });
        }
        
        const category = {
            id: Date.now().toString(),
            name_ar: name_ar.trim(),
            name_en: name_en.trim(),
            slug: slug.trim(),
            description_ar: req.body.description_ar ? req.body.description_ar.trim() : '',
            description_en: req.body.description_en ? req.body.description_en.trim() : '',
            image: req.body.image || '',
            order: parseInt(req.body.order) || 0,
            active: req.body.active !== false,
            created_at: new Date().toISOString()
        };
        
        db.categories.push(category);
        saveDB();
        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/categories/:id', (req, res) => {
    try {
        const index = db.categories.findIndex(c => c.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'القسم غير موجود' });
        }
        
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
            const existingCategory = db.categories.find(c => c.slug === slug.trim() && c.id != req.params.id);
            if (existingCategory) {
                return res.status(400).json({ error: 'الرابط المختصر مستخدم بالفعل' });
            }
        }
        
        // Update category with validation
        const updatedCategory = { ...db.categories[index] };
        
        if (name_ar !== undefined) updatedCategory.name_ar = name_ar.trim();
        if (name_en !== undefined) updatedCategory.name_en = name_en.trim();
        if (slug !== undefined) updatedCategory.slug = slug.trim();
        if (req.body.description_ar !== undefined) updatedCategory.description_ar = req.body.description_ar.trim();
        if (req.body.description_en !== undefined) updatedCategory.description_en = req.body.description_en.trim();
        if (req.body.image !== undefined) updatedCategory.image = req.body.image;
        if (req.body.order !== undefined) updatedCategory.order = parseInt(req.body.order) || 0;
        if (req.body.active !== undefined) updatedCategory.active = req.body.active !== false;
        
        updatedCategory.updated_at = new Date().toISOString();
        
        db.categories[index] = updatedCategory;
        saveDB();
        res.json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/categories/:id', (req, res) => {
    try {
        const index = db.categories.findIndex(c => c.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'القسم غير موجود' });
        }
        
        // Check if category has projects
        const projectsInCategory = db.projects.filter(p => p.category_id == req.params.id);
        if (projectsInCategory.length > 0) {
            return res.status(400).json({ 
                error: `لا يمكن حذف هذا القسم لأنه يحتوي على ${projectsInCategory.length} مشروع. يرجى نقل المشاريع إلى قسم آخر أولاً.` 
            });
        }
        
        const deletedCategory = db.categories.splice(index, 1)[0];
        saveDB();
        res.json({ message: 'تم حذف القسم بنجاح', deleted: deletedCategory });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Stats API
app.get('/api/stats', (req, res) => {
    try {
        const stats = {
            projects: {
                total: db.projects.length,
                featured: db.projects.filter(p => p.featured).length
            },
            categories: db.categories.length,
            consultations: {
                total: db.consultations.length,
                pending: db.consultations.filter(c => c.status === 'pending').length,
                completed: db.consultations.filter(c => c.status === 'completed').length
            }
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// File upload API
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({
            success: true,
            fileUrl: fileUrl,
            filename: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ error: 'File upload failed' });
    }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📁 Static files served from: ${__dirname}`);
    console.log(`🔗 Available routes:`);
    console.log(`   - Home: http://localhost:${PORT}/`);
    console.log(`   - Admin: http://localhost:${PORT}/admin`);
    console.log(`   - Admin Login: http://localhost:${PORT}/admin-login`);
    console.log(`   - Contact: http://localhost:${PORT}/contact`);
    console.log(`   - Project Details: http://localhost:${PORT}/project-details`);
    console.log(`   - API Base: http://localhost:${PORT}/api`);
});

module.exports = app; 