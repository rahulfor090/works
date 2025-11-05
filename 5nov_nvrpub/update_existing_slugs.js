const mysql = require('mysql2/promise');

async function updateContentTypeSlugs() {
  let connection;
  
  try {
    // Create database connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root', // Update with your MySQL password
      database: 'jaypeedigi'
    });

    console.log('Connected to database');

    // First, add the slug column if it doesn't exist
    try {
      await connection.execute(`
        ALTER TABLE contenttype ADD COLUMN slug VARCHAR(128) NOT NULL DEFAULT '' AFTER title
      `);
      console.log('Added slug column to contenttype table');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('Slug column already exists');
      } else {
        throw error;
      }
    }

    // Get all existing content types
    const [rows] = await connection.execute('SELECT id, title FROM contenttype WHERE slug = "" OR slug IS NULL');
    
    console.log(`Found ${rows.length} content types to update`);

    // Update each content type with a slug based on its title
    for (const row of rows) {
      const slug = row.title
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, '')     // Remove special characters
        .replace(/-+/g, '-')            // Replace multiple hyphens with single
        .replace(/^-|-$/g, '');         // Remove leading/trailing hyphens

      await connection.execute(
        'UPDATE contenttype SET slug = ? WHERE id = ?',
        [slug, row.id]
      );
      
      console.log(`Updated "${row.title}" with slug: "${slug}"`);
    }

    // Add unique constraint to slug column if it doesn't exist
    try {
      await connection.execute('ALTER TABLE contenttype ADD UNIQUE KEY unique_slug (slug)');
      console.log('Added unique constraint to slug column');
    } catch (error) {
      if (error.code === 'ER_DUP_KEYNAME') {
        console.log('Unique constraint already exists');
      } else {
        throw error;
      }
    }

    console.log('Successfully updated all content type slugs');

  } catch (error) {
    console.error('Error updating content type slugs:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the update
updateContentTypeSlugs();
