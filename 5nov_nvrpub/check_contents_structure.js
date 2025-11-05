const mysql = require('mysql2/promise');

async function checkContentsStructure() {
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

    // Check contents table structure
    console.log('Contents table structure:');
    const [columns] = await connection.execute('DESCRIBE contents');
    columns.forEach(col => {
      console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key ? `(${col.Key})` : ''}`);
    });

    // Check categories table structure
    console.log('\nCategories table structure:');
    const [catColumns] = await connection.execute('DESCRIBE categories');
    catColumns.forEach(col => {
      console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key ? `(${col.Key})` : ''}`);
    });

    // Check if there are any content type related data in categories
    console.log('\nCategories data:');
    const [categories] = await connection.execute('SELECT * FROM categories LIMIT 10');
    categories.forEach(cat => {
      console.log(cat);
    });

    // Check contents data sample
    console.log('\nContents data sample:');
    const [contents] = await connection.execute('SELECT * FROM contents LIMIT 5');
    contents.forEach(content => {
      console.log(content);
    });

  } catch (error) {
    console.error('Error checking structure:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the check
checkContentsStructure();
