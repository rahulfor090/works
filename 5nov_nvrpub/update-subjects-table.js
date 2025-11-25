// Script to update subjects table with new fields
// Run this with: node update-subjects-table.js

const mysql = require('mysql2/promise');

async function updateSubjectsTable() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: 'jaypeedigi'
    });

    console.log('✅ Connected to database\n');

    // Add slug column
    console.log('📝 Adding slug column...');
    await connection.execute(`
      ALTER TABLE subjects 
      ADD COLUMN slug VARCHAR(255) NULL AFTER subject
    `);
    console.log('✅ Slug column added\n');

    // Add description column
    console.log('📝 Adding description column...');
    await connection.execute(`
      ALTER TABLE subjects 
      ADD COLUMN description TEXT NULL AFTER slug
    `);
    console.log('✅ Description column added\n');

    // Add sort_order column
    console.log('📝 Adding sort_order column...');
    await connection.execute(`
      ALTER TABLE subjects 
      ADD COLUMN sort_order INT DEFAULT 0 AFTER description
    `);
    console.log('✅ Sort_order column added\n');

    // Add is_homepage column
    console.log('📝 Adding is_homepage column...');
    await connection.execute(`
      ALTER TABLE subjects 
      ADD COLUMN is_homepage TINYINT(1) DEFAULT 0 AFTER sort_order
    `);
    console.log('✅ Is_homepage column added\n');

    // Add is_slider column
    console.log('📝 Adding is_slider column...');
    await connection.execute(`
      ALTER TABLE subjects 
      ADD COLUMN is_slider TINYINT(1) DEFAULT 0 AFTER is_homepage
    `);
    console.log('✅ Is_slider column added\n');

    // Add indexes
    console.log('📝 Adding indexes...');
    await connection.execute(`
      CREATE INDEX idx_slug ON subjects(slug)
    `);
    await connection.execute(`
      CREATE INDEX idx_is_homepage ON subjects(is_homepage)
    `);
    console.log('✅ Indexes added\n');

    // Generate slugs for existing records
    console.log('📝 Generating slugs for existing records...');
    await connection.execute(`
      UPDATE subjects 
      SET slug = LOWER(REPLACE(REPLACE(REPLACE(subject, ' ', '-'), '&', 'and'), ',', ''))
      WHERE slug IS NULL OR slug = ''
    `);
    console.log('✅ Slugs generated\n');

    // Show updated structure
    console.log('📊 Updated table structure:');
    const [structure] = await connection.execute('DESCRIBE subjects');
    console.table(structure);

    // Show sample data
    console.log('\n📋 Sample data:');
    const [data] = await connection.execute('SELECT * FROM subjects LIMIT 5');
    console.table(data);

    console.log('\n✅ All updates completed successfully!');
    console.log('You can now use the admin dashboard at /admin/subjectcategories');

  } catch (error) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log('⚠️  Some columns already exist. This is normal if you\'ve run this script before.');
      console.log('Error:', error.message);
    } else {
      console.error('❌ Error updating table:', error);
      throw error;
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n✅ Database connection closed');
    }
  }
}

// Run the update
updateSubjectsTable().catch(console.error);
