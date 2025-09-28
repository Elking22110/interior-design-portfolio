# إعداد سريع لـ Supabase

## بيانات المشروع
- **URL:** https://ndpaaulprnplvyezhhih.supabase.co
- **API Key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcGFhdWxwcm5wbHZ5ZXpoaGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMjM4ODUsImV4cCI6MjA3NDU5OTg4NX0.xMnjnITYvXvA-i-koDPdTxXP4axbWHBWYNS1vvFrimU

## خطوات الإعداد

### 1. إنشاء الجداول في Supabase
1. اذهب إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك
3. اذهب إلى **SQL Editor**
4. انسخ محتوى ملف `supabase-schema.sql`
5. الصق الكود واضغط **Run**

### 2. إعداد متغيرات البيئة في Vercel
1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. اختر مشروعك
3. اذهب إلى **Settings** > **Environment Variables**
4. أضف المتغيرات التالية:

```
SUPABASE_URL = https://ndpaaulprnplvyezhhih.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcGFhdWxwcm5wbHZ5ZXpoaGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMjM4ODUsImV4cCI6MjA3NDU5OTg4NX0.xMnjnITYvXvA-i-koDPdTxXP4axbWHBWYNS1vvFrimU
```

### 3. إعادة نشر المشروع
1. في Vercel Dashboard، اضغط **Redeploy**
2. أو ادفع التغييرات إلى GitHub

## التحقق من الحل
1. اذهب إلى موقعك على Vercel
2. أرسل استشارة جديدة من صفحة الاتصال
3. تحقق من لوحة التحكم - يجب أن تظهر الاستشارة
4. تحقق من Supabase Dashboard - يجب أن تظهر في جدول consultations

## ملاحظات
- تأكد من تشغيل SQL script في Supabase
- تأكد من إضافة متغيرات البيئة في Vercel
- تأكد من إعادة نشر المشروع
- البيانات ستُحفظ في Supabase بشكل دائم
