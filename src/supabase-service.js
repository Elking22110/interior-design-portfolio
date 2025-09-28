// Supabase Database Service for MG Designs Portfolio
// This service handles database operations using Supabase for persistent storage

const { createClient } = require('@supabase/supabase-js');

class SupabaseService {
    constructor() {
        // Supabase configuration
        this.supabaseUrl = process.env.SUPABASE_URL;
        this.supabaseKey = process.env.SUPABASE_ANON_KEY;
        
        // Check if Supabase is configured
        this.isConfigured = !!(this.supabaseUrl && this.supabaseKey && 
                              this.supabaseUrl !== 'your-supabase-url' && 
                              this.supabaseKey !== 'your-supabase-anon-key');
        
        if (this.isConfigured) {
            this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
            console.log('✅ Supabase client initialized successfully');
        } else {
            console.log('⚠️  Supabase not configured, using local fallback');
            this.loadLocalDB();
        }
    }

    // Load local database (fallback)
    loadLocalDB() {
        const fs = require('fs');
        const path = require('path');
        
        try {
            const dbPath = path.join(__dirname, 'db.json');
            this.localDB = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            console.log('📁 Local database loaded as fallback');
        } catch (error) {
            console.log('🔄 Creating default database structure...');
            this.localDB = this.getDefaultDB();
            this.saveLocalDB();
        }
    }

    // Save local database (fallback)
    saveLocalDB() {
        if (this.isConfigured) return;
        
        const fs = require('fs');
        const path = require('path');
        
        try {
            const dbPath = path.join(__dirname, 'db.json');
            fs.writeFileSync(dbPath, JSON.stringify(this.localDB, null, 2));
            console.log('💾 Local database saved');
        } catch (error) {
            console.error('❌ Error saving local database:', error);
        }
    }

    // Get default database structure
    getDefaultDB() {
        return {
            users: [
                {
                    "id": "1",
                    "name": "Hassan Elking",
                    "username": "Hassan Elking",
                    "password": "HassanElking221100",
                    "role": "superadmin",
                    "permissions": [
                        "add_category", "edit_category", "delete_category",
                        "add_project", "edit_project", "delete_project",
                        "add_image", "edit_image", "delete_image",
                        "projects", "consultations", "settings", "users"
                    ]
                }
            ],
            categories: [
                {
                    "id": "1",
                    "name_ar": "01-Kitchens - تصميمات مطابخ خشبية فاخرة",
                    "name_en": "01-Kitchens - Luxury Wooden Kitchen Designs",
                    "slug": "wooden-kitchens",
                    "description_ar": "مطابخ خشبية فاخرة تجمع بين الجمال والوظيفة",
                    "description_en": "Luxury wooden kitchens combining beauty and functionality",
                    "image": "images/new-kitchen-1.jpg",
                    "order": 3,
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

    // Get database (Supabase or local fallback)
    getDB() {
        if (this.isConfigured) {
            return this.supabase;
        }
        return this.localDB;
    }

    // CONSULTATIONS METHODS

    // Get all consultations
    async getConsultations() {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('consultations')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                return data || [];
            } catch (error) {
                console.error('Error fetching consultations from Supabase:', error);
                return [];
            }
        }
        return this.localDB.consultations || [];
    }

    // Add consultation
    async addConsultation(consultationData) {
        const consultation = {
            ...consultationData,
            status: 'pending',
            created_at: new Date().toISOString()
        };

        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('consultations')
                    .insert([consultation])
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('✅ Consultation added to Supabase:', data.id);
                return data;
            } catch (error) {
                console.error('Error adding consultation to Supabase:', error);
                throw error;
            }
        } else {
            consultation.id = Date.now().toString();
            this.localDB.consultations.push(consultation);
            this.saveLocalDB();
            console.log('✅ Consultation added to local DB:', consultation.id);
            return consultation;
        }
    }

    // Update consultation
    async updateConsultation(id, updateData) {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('consultations')
                    .update({
                        ...updateData,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', id)
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('✅ Consultation updated in Supabase:', data.id);
                return data;
            } catch (error) {
                console.error('Error updating consultation in Supabase:', error);
                throw error;
            }
        } else {
            const index = this.localDB.consultations.findIndex(c => c.id == id);
            if (index === -1) {
                throw new Error('Consultation not found');
            }
            
            this.localDB.consultations[index] = {
                ...this.localDB.consultations[index],
                ...updateData,
                updated_at: new Date().toISOString()
            };
            this.saveLocalDB();
            console.log('✅ Consultation updated in local DB:', id);
            return this.localDB.consultations[index];
        }
    }

    // Delete consultation
    async deleteConsultation(id) {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('consultations')
                    .delete()
                    .eq('id', id)
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('✅ Consultation deleted from Supabase:', data.id);
                return data;
            } catch (error) {
                console.error('Error deleting consultation from Supabase:', error);
                throw error;
            }
        } else {
            const index = this.localDB.consultations.findIndex(c => c.id == id);
            if (index === -1) {
                throw new Error('Consultation not found');
            }
            
            const deleted = this.localDB.consultations.splice(index, 1)[0];
            this.saveLocalDB();
            console.log('✅ Consultation deleted from local DB:', deleted.id);
            return deleted;
        }
    }

    // PROJECTS METHODS

    // Get all projects
    async getProjects() {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                return data || [];
            } catch (error) {
                console.error('Error fetching projects from Supabase:', error);
                return [];
            }
        }
        return this.localDB.projects || [];
    }

    // Get projects by category
    async getProjectsByCategory(categoryId) {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('projects')
                    .select('*')
                    .eq('category_id', categoryId)
                    .order('order', { ascending: true });
                
                if (error) throw error;
                return data || [];
            } catch (error) {
                console.error('Error fetching projects by category from Supabase:', error);
                return [];
            }
        }
        return (this.localDB.projects || []).filter(p => p.category_id == categoryId);
    }

    // Add project
    async addProject(projectData) {
        const project = {
            ...projectData,
            created_at: new Date().toISOString()
        };

        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('projects')
                    .insert([project])
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('✅ Project added to Supabase:', data.id);
                return data;
            } catch (error) {
                console.error('Error adding project to Supabase:', error);
                throw error;
            }
        } else {
            project.id = Date.now().toString();
            this.localDB.projects.push(project);
            this.saveLocalDB();
            console.log('✅ Project added to local DB:', project.id);
            return project;
        }
    }

    // Update project
    async updateProject(id, updateData) {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('projects')
                    .update({
                        ...updateData,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', id)
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('✅ Project updated in Supabase:', data.id);
                return data;
            } catch (error) {
                console.error('Error updating project in Supabase:', error);
                throw error;
            }
        } else {
            const index = this.localDB.projects.findIndex(p => p.id == id);
            if (index === -1) {
                throw new Error('Project not found');
            }
            
            this.localDB.projects[index] = {
                ...this.localDB.projects[index],
                ...updateData,
                updated_at: new Date().toISOString()
            };
            this.saveLocalDB();
            console.log('✅ Project updated in local DB:', id);
            return this.localDB.projects[index];
        }
    }

    // Delete project
    async deleteProject(id) {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('projects')
                    .delete()
                    .eq('id', id)
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('✅ Project deleted from Supabase:', data.id);
                return data;
            } catch (error) {
                console.error('Error deleting project from Supabase:', error);
                throw error;
            }
        } else {
            const index = this.localDB.projects.findIndex(p => p.id == id);
            if (index === -1) {
                throw new Error('Project not found');
            }
            
            const deleted = this.localDB.projects.splice(index, 1)[0];
            this.saveLocalDB();
            console.log('✅ Project deleted from local DB:', deleted.id);
            return deleted;
        }
    }

    // CATEGORIES METHODS

    // Get all categories
    async getCategories() {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('categories')
                    .select('*')
                    .order('order', { ascending: true });
                
                if (error) throw error;
                return data || [];
            } catch (error) {
                console.error('Error fetching categories from Supabase:', error);
                return [];
            }
        }
        return this.localDB.categories || [];
    }

    // Add category
    async addCategory(categoryData) {
        const category = {
            ...categoryData,
            created_at: new Date().toISOString()
        };

        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('categories')
                    .insert([category])
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('✅ Category added to Supabase:', data.id);
                return data;
            } catch (error) {
                console.error('Error adding category to Supabase:', error);
                throw error;
            }
        } else {
            category.id = Date.now().toString();
            this.localDB.categories.push(category);
            this.saveLocalDB();
            console.log('✅ Category added to local DB:', category.id);
            return category;
        }
    }

    // Update category
    async updateCategory(id, updateData) {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('categories')
                    .update({
                        ...updateData,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', id)
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('✅ Category updated in Supabase:', data.id);
                return data;
            } catch (error) {
                console.error('Error updating category in Supabase:', error);
                throw error;
            }
        } else {
            const index = this.localDB.categories.findIndex(c => c.id == id);
            if (index === -1) {
                throw new Error('Category not found');
            }
            
            this.localDB.categories[index] = {
                ...this.localDB.categories[index],
                ...updateData,
                updated_at: new Date().toISOString()
            };
            this.saveLocalDB();
            console.log('✅ Category updated in local DB:', id);
            return this.localDB.categories[index];
        }
    }

    // Delete category
    async deleteCategory(id) {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('categories')
                    .delete()
                    .eq('id', id)
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('✅ Category deleted from Supabase:', data.id);
                return data;
            } catch (error) {
                console.error('Error deleting category from Supabase:', error);
                throw error;
            }
        } else {
            const index = this.localDB.categories.findIndex(c => c.id == id);
            if (index === -1) {
                throw new Error('Category not found');
            }
            
            const deleted = this.localDB.categories.splice(index, 1)[0];
            this.saveLocalDB();
            console.log('✅ Category deleted from local DB:', deleted.id);
            return deleted;
        }
    }

    // USERS METHODS

    // Get all users
    async getUsers() {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('users')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                return data || [];
            } catch (error) {
                console.error('Error fetching users from Supabase:', error);
                return [];
            }
        }
        return this.localDB.users || [];
    }

    // Add user
    async addUser(userData) {
        const user = {
            ...userData,
            created_at: new Date().toISOString()
        };

        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('users')
                    .insert([user])
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('✅ User added to Supabase:', data.id);
                return data;
            } catch (error) {
                console.error('Error adding user to Supabase:', error);
                throw error;
            }
        } else {
            user.id = Date.now().toString();
            this.localDB.users.push(user);
            this.saveLocalDB();
            console.log('✅ User added to local DB:', user.id);
            return user;
        }
    }

    // Update user
    async updateUser(id, updateData) {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('users')
                    .update({
                        ...updateData,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', id)
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('✅ User updated in Supabase:', data.id);
                return data;
            } catch (error) {
                console.error('Error updating user in Supabase:', error);
                throw error;
            }
        } else {
            const index = this.localDB.users.findIndex(u => u.id == id);
            if (index === -1) {
                throw new Error('User not found');
            }
            
            this.localDB.users[index] = {
                ...this.localDB.users[index],
                ...updateData,
                updated_at: new Date().toISOString()
            };
            this.saveLocalDB();
            console.log('✅ User updated in local DB:', id);
            return this.localDB.users[index];
        }
    }

    // Delete user
    async deleteUser(id) {
        if (this.isConfigured) {
            try {
                const { data, error } = await this.supabase
                    .from('users')
                    .delete()
                    .eq('id', id)
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('✅ User deleted from Supabase:', data.id);
                return data;
            } catch (error) {
                console.error('Error deleting user from Supabase:', error);
                throw error;
            }
        } else {
            const index = this.localDB.users.findIndex(u => u.id == id);
            if (index === -1) {
                throw new Error('User not found');
            }
            
            const deleted = this.localDB.users.splice(index, 1)[0];
            this.saveLocalDB();
            console.log('✅ User deleted from local DB:', deleted.id);
            return deleted;
        }
    }

    // Get stats
    async getStats() {
        try {
            const [projects, categories, consultations] = await Promise.all([
                this.getProjects(),
                this.getCategories(),
                this.getConsultations()
            ]);

            return {
                projects: {
                    total: projects.length,
                    featured: projects.filter(p => p.featured).length
                },
                categories: categories.length,
                consultations: {
                    total: consultations.length,
                    pending: consultations.filter(c => c.status === 'pending').length,
                    completed: consultations.filter(c => c.status === 'completed').length
                }
            };
        } catch (error) {
            console.error('Error getting stats:', error);
            return {
                projects: { total: 0, featured: 0 },
                categories: 0,
                consultations: { total: 0, pending: 0, completed: 0 }
            };
        }
    }
}

module.exports = SupabaseService;
