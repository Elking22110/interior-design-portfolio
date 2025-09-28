# إعداد Supabase لحل مشكلة الاستشارات في Vercel

## المشكلة
الاستشارات لا تظهر في لوحة التحكم على Vercel لأن البيانات لا تُحفظ بشكل دائم في ملف JSON.

## الحل: استخدام Supabase

### الخطوة 1: إنشاء حساب في Supabase
1. اذهب إلى [Supabase.com](https://supabase.com/)
2. سجل حساب جديد (مجاني)
3. أنشئ مشروع جديد

### الخطوة 2: إعداد قاعدة البيانات
1. في لوحة تحكم Supabase، اذهب إلى **SQL Editor**
2. أنشئ الجداول التالية:

```sql
-- جدول المستخدمين
CREATE TABLE users (
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
CREATE TABLE categories (
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
CREATE TABLE projects (
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
CREATE TABLE consultations (
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
```

### الخطوة 3: إدراج البيانات الأولية
```sql
-- إدراج مستخدم افتراضي
INSERT INTO users (name, username, password, role, permissions) VALUES 
('Hassan Elking', 'Hassan Elking', 'HassanElking221100', 'superadmin', 
 ARRAY['add_category', 'edit_category', 'delete_category', 'add_project', 'edit_project', 'delete_project', 'add_image', 'edit_image', 'delete_image', 'projects', 'consultations', 'settings', 'users']);

-- إدراج قسم افتراضي
INSERT INTO categories (name_ar, name_en, slug, description_ar, description_en, image, "order") VALUES 
('01-Kitchens - تصميمات مطابخ خشبية فاخرة', '01-Kitchens - Luxury Wooden Kitchen Designs', 'wooden-kitchens', 
 'مطابخ خشبية فاخرة تجمع بين الجمال والوظيفة', 'Luxury wooden kitchens combining beauty and functionality', 
 'images/new-kitchen-1.jpg', 3);
```

### الخطوة 4: إعداد Row Level Security (RLS)
```sql
-- تفعيل RLS للجداول
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات للوصول العام (للمشروع الحالي)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations on categories" ON categories FOR ALL USING (true);
CREATE POLICY "Allow all operations on projects" ON projects FOR ALL USING (true);
CREATE POLICY "Allow all operations on consultations" ON consultations FOR ALL USING (true);
```

### الخطوة 5: الحصول على بيانات الاتصال
1. اذهب إلى **Settings** > **API**
2. انسخ:
   - **Project URL** (SUPABASE_URL)
   - **anon public** key (SUPABASE_ANON_KEY)

### الخطوة 6: إعداد متغيرات البيئة في Vercel
1. اذهب إلى مشروعك في [Vercel Dashboard](https://vercel.com/dashboard)
2. اختر مشروعك
3. اذهب إلى **Settings** > **Environment Variables**
4. أضف المتغيرات التالية:

```
SUPABASE_URL = your-project-url
SUPABASE_ANON_KEY = your-anon-key
```

### الخطوة 7: إعادة نشر المشروع
1. في Vercel Dashboard، اضغط **Redeploy**
2. أو ادفع التغييرات إلى GitHub

## التحقق من الحل
1. اذهب إلى موقعك على Vercel
2. أرسل استشارة جديدة من صفحة الاتصال
3. تحقق من لوحة التحكم - يجب أن تظهر الاستشارة
4. تحقق من Supabase Dashboard - يجب أن تظهر البيانات في جدول consultations

## المزايا
- ✅ **قاعدة بيانات حقيقية** - PostgreSQL
- ✅ **تخزين دائم** - البيانات لا تُفقد
- ✅ **API جاهزة** - REST API تلقائياً
- ✅ **واجهة إدارة** - لوحة تحكم Supabase
- ✅ **مجاني** - حتى 500MB و 50,000 طلب شهرياً
- ✅ **أمان** - Row Level Security
- ✅ **نسخ احتياطي** - تلقائي

## استكشاف الأخطاء
إذا لم تعمل:
1. تأكد من صحة SUPABASE_URL و SUPABASE_ANON_KEY
2. تحقق من RLS policies في Supabase
3. تحقق من logs في Vercel Dashboard
4. تأكد من إعادة نشر المشروع بعد إضافة متغيرات البيئة
5. تحقق من Supabase Dashboard للتأكد من إنشاء الجداول

## ملاحظات مهمة
- تأكد من تشغيل SQL scripts بالترتيب
- RLS policies تسمح بالوصول العام (للمشروع الحالي)
- يمكنك تخصيص الأمان لاحقاً حسب الحاجة
- البيانات محفوظة بشكل دائم في Supabase
