-- Supabase Database Schema for MG Designs Portfolio
-- Run this in Supabase SQL Editor

-- جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    permissions TEXT[],
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الأقسام
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    image TEXT,
    "order" INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول المشاريع
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title_ar TEXT NOT NULL,
    title_en TEXT,
    description_ar TEXT NOT NULL,
    description_en TEXT,
    category_id INTEGER REFERENCES categories(id),
    images TEXT[],
    tags TEXT[],
    tags_en TEXT[],
    featured BOOLEAN DEFAULT false,
    "order" INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الاستشارات
CREATE TABLE IF NOT EXISTS consultations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إدراج البيانات الأولية

-- إدراج مستخدم افتراضي
INSERT INTO users (name, username, password, role, permissions) VALUES 
('Hassan Elking', 'Hassan Elking', 'HassanElking221100', 'superadmin', 
 ARRAY['add_category', 'edit_category', 'delete_category', 'add_project', 'edit_project', 'delete_project', 'add_image', 'edit_image', 'delete_image', 'projects', 'consultations', 'settings', 'users'])
ON CONFLICT (username) DO NOTHING;

-- إدراج أقسام افتراضية
INSERT INTO categories (name_ar, name_en, slug, description_ar, description_en, image, "order") VALUES 
('01-Kitchens - تصميمات مطابخ خشبية فاخرة', '01-Kitchens - Luxury Wooden Kitchen Designs', 'wooden-kitchens', 
 'مطابخ خشبية فاخرة تجمع بين الجمال والوظيفة', 'Luxury wooden kitchens combining beauty and functionality', 
 'images/new-kitchen-1.jpg', 3),
('02-Dressing - تصميمات غرف ملابس خشبية', '02-Dressing - Wooden Dressing Room Designs', 'wooden-dressing', 
 'غرف ملابس خشبية أنيقة ومنظمة', 'Elegant and organized wooden dressing rooms', 
 'images/office-design.jpg', 4),
('03-Toilet Units - تصميمات وحدات حمام خشبية', '03-Toilet Units - Wooden Bathroom Unit Designs', 'wooden-toilet-units', 
 'وحدات حمام خشبية عملية وجميلة', 'Practical and beautiful wooden bathroom units', 
 'images/new-apartment-2.jpg', 5),
('04-Laundry - تصميمات غرف غسيل خشبية', '04-Laundry - Wooden Laundry Room Designs', 'wooden-laundry', 
 'غرف غسيل خشبية منظمة وعملية', 'Organized and practical wooden laundry rooms', 
 'images/new-villa-2.jpg', 6),
('05-Kitchenette - تصميمات مطابخ صغيرة خشبية', '05-Kitchenette - Small Wooden Kitchen Designs', 'wooden-kitchenette', 
 'مطابخ صغيرة خشبية مثالية للمساحات المحدودة', 'Small wooden kitchens perfect for limited spaces', 
 'images/new-apartment-1.webp', 7),
('06-Others - تصميمات خشبية أخرى', '06-Others - Other Wooden Designs', 'wooden-others', 
 'تصميمات خشبية متنوعة حسب الطلب', 'Various wooden designs according to request', 
 'images/new-kitchen-1.jpg', 8),
('01-Design - تصميمات داخلية عصرية وكلاسيكية', '01-Design - Modern and Classic Interior Designs', 'interior-design', 
 'تصميمات داخلية متنوعة تجمع بين الطراز العصري والكلاسيكي', 'Diverse interior designs combining modern and classic styles', 
 'images/new-apartment-1.webp', 1),
('02-Site - تصميمات للمواقع والمشاريع', '02-Site - Site and Project Designs', 'site-projects', 
 'تصميمات شاملة للمواقع والمشاريع الكبيرة', 'Comprehensive designs for sites and large projects', 
 'images/new-villa-1.jpg', 2)
ON CONFLICT (slug) DO NOTHING;

-- تفعيل Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات للوصول العام (للمشروع الحالي)
-- يمكنك تخصيص هذه السياسات لاحقاً حسب الحاجة

CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations on categories" ON categories FOR ALL USING (true);
CREATE POLICY "Allow all operations on projects" ON projects FOR ALL USING (true);
CREATE POLICY "Allow all operations on consultations" ON consultations FOR ALL USING (true);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_projects_category_id ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(active);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(active);

-- إنشاء دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- إنشاء triggers لتحديث updated_at تلقائياً
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
