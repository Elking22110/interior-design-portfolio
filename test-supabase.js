// Test Supabase Connection
// Run this file to test if Supabase is working correctly

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://ndpaaulprnplvyezhhih.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcGFhdWxwcm5wbHZ5ZXpoaGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMjM4ODUsImV4cCI6MjA3NDU5OTg4NX0.xMnjnITYvXvA-i-koDPdTxXP4axbWHBWYNS1vvFrimU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
    console.log('🧪 Testing Supabase Connection...\n');

    try {
        // Test 1: Check connection
        console.log('1️⃣ Testing connection...');
        const { data, error } = await supabase.from('categories').select('count').limit(1);
        if (error) throw error;
        console.log('✅ Connection successful!\n');

        // Test 2: Get categories
        console.log('2️⃣ Testing categories table...');
        const { data: categories, error: categoriesError } = await supabase
            .from('categories')
            .select('*')
            .limit(5);
        
        if (categoriesError) throw categoriesError;
        console.log(`✅ Found ${categories.length} categories`);
        categories.forEach(cat => {
            console.log(`   - ${cat.name_ar} (${cat.slug})`);
        });
        console.log('');

        // Test 3: Get consultations
        console.log('3️⃣ Testing consultations table...');
        const { data: consultations, error: consultationsError } = await supabase
            .from('consultations')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);
        
        if (consultationsError) throw consultationsError;
        console.log(`✅ Found ${consultations.length} consultations`);
        consultations.forEach(consultation => {
            console.log(`   - ${consultation.name} (${consultation.status}) - ${consultation.created_at}`);
        });
        console.log('');

        // Test 4: Add test consultation
        console.log('4️⃣ Testing add consultation...');
        const testConsultation = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '01234567890',
            service: 'consultation',
            message: 'This is a test consultation from the test script',
            status: 'pending'
        };

        const { data: newConsultation, error: addError } = await supabase
            .from('consultations')
            .insert([testConsultation])
            .select()
            .single();

        if (addError) throw addError;
        console.log(`✅ Test consultation added with ID: ${newConsultation.id}`);
        console.log('');

        // Test 5: Update consultation status
        console.log('5️⃣ Testing update consultation...');
        const { data: updatedConsultation, error: updateError } = await supabase
            .from('consultations')
            .update({ status: 'completed' })
            .eq('id', newConsultation.id)
            .select()
            .single();

        if (updateError) throw updateError;
        console.log(`✅ Consultation status updated to: ${updatedConsultation.status}`);
        console.log('');

        // Test 6: Delete test consultation
        console.log('6️⃣ Testing delete consultation...');
        const { error: deleteError } = await supabase
            .from('consultations')
            .delete()
            .eq('id', newConsultation.id);

        if (deleteError) throw deleteError;
        console.log('✅ Test consultation deleted');
        console.log('');

        console.log('🎉 All tests passed! Supabase is working correctly.');
        console.log('📊 Your database is ready for production use.');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('🔍 Error details:', error);
        
        if (error.message.includes('relation "categories" does not exist')) {
            console.log('\n💡 Solution: Run the SQL schema in Supabase SQL Editor first.');
            console.log('   Copy the content from supabase-schema.sql and run it.');
        } else if (error.message.includes('JWT')) {
            console.log('\n💡 Solution: Check your SUPABASE_ANON_KEY is correct.');
        } else if (error.message.includes('fetch')) {
            console.log('\n💡 Solution: Check your SUPABASE_URL is correct and accessible.');
        }
    }
}

// Run the test
testSupabase();
