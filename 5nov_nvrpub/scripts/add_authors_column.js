const mysql = require('mysql2/promise');

async function migrate() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Smarth@2006',
    database: 'jaypeedigi'
  });

  try {
    // Check if column exists
    const [columns] = await connection.execute("SHOW COLUMNS FROM books LIKE 'authors'");
    if (columns.length === 0) {
      console.log('Adding authors column...');
      await connection.execute('ALTER TABLE books ADD COLUMN authors TEXT AFTER book_title');
      console.log('Authors column added successfully.');
    } else {
      console.log('Authors column already exists.');
    }
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await connection.end();
  }
}

migrate();
