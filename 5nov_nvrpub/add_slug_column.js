const mysql = require('mysql2/promise');

async function addSlugColumn() {
  let connection;
  
  try {
    // Create database connection with correct database name
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root', // Update with your MySQL password
      database: 'jaypeedigi'  // Correct database name
    });

    console.log('Connected to jaypeedigi database');

    // Add slug column to existing contenttype table
    try {
      await connection.execute(`
        ALTER TABLE contenttype 
        ADD COLUMN slug VARCHAR(128) NOT NULL DEFAULT '' AFTER title
      `);
      console.log('Slug column added successfully');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('Slug column already exists');
      } else {
        throw error;
      }
    }

    // Generate slugs for existing records
    const [existingRecords] = await connection.execute('SELECT id, title FROM contenttype WHERE slug = "" OR slug IS NULL');
    
    console.log(`Found ${existingRecords.length} records without slugs`);
    
    for (const record of existingRecords) {
      const slug = record.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      await connection.execute(
        'UPDATE contenttype SET slug = ? WHERE id = ?',
        [slug, record.id]
      );
      console.log(`Updated ${record.title} with slug: ${slug}`);
    }

    // Add unique constraint to slug column
    try {
      await connection.execute('ALTER TABLE contenttype ADD UNIQUE KEY unique_slug (slug)');
      console.log('Added unique constraint to slug column');
    } catch (error) {
      if (error.code === 'ER_DUP_KEYNAME') {
        console.log('Unique constraint already exists on slug column');
      } else {
        console.log('Note: Could not add unique constraint, may have duplicate slugs');
      }
    }

    // Show the updated table structure
    console.log('\nUpdated contenttype table structure:');
    const [columns] = await connection.execute('DESCRIBE contenttype');
    columns.forEach(col => {
      console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key ? `(${col.Key})` : ''}`);
    });

    // Show updated data
    console.log('\nUpdated content types:');
    const [rows] = await connection.execute('SELECT id, title, slug, isActive FROM contenttype ORDER BY displayOrder');
    rows.forEach(row => {
      console.log(`- ID: ${row.id}, Title: ${row.title}, Slug: ${row.slug}, Active: ${row.isActive}`);
    });

  } catch (error) {
    console.error('Error adding slug column:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the update
addSlugColumn();
