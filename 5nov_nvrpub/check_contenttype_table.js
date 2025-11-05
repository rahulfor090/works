const mysql = require('mysql2/promise');

async function checkContentTypeTable() {
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

    // Check if contenttype table exists
    const [tableCheck] = await connection.execute("SHOW TABLES LIKE 'contenttype'");
    if (tableCheck.length === 0) {
      console.log('Contenttype table does not exist!');
      return;
    }

    console.log('Contenttype table exists');

    // Show table structure
    console.log('\nContenttype table structure:');
    const [columns] = await connection.execute('DESCRIBE contenttype');
    columns.forEach(col => {
      console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key ? `(${col.Key})` : ''} ${col.Default !== null ? `DEFAULT ${col.Default}` : ''}`);
    });

    // Check if slug column exists
    const slugColumn = columns.find(col => col.Field === 'slug');
    if (slugColumn) {
      console.log('\n✓ Slug column exists');
    } else {
      console.log('\n✗ Slug column does not exist');
    }

    // Show current data
    console.log('\nCurrent contenttype data:');
    const [rows] = await connection.execute('SELECT * FROM contenttype ORDER BY displayOrder');
    if (rows.length === 0) {
      console.log('No data found in contenttype table');
    } else {
      rows.forEach(row => {
        console.log(`- ID: ${row.id}, Title: ${row.title}, Slug: ${row.slug || 'NULL'}, Active: ${row.isActive}`);
      });
    }

  } catch (error) {
    console.error('Error checking contenttype table:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the check
checkContentTypeTable();
