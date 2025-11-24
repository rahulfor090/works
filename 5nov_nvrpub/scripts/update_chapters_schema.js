const mysql = require('mysql2/promise');

async function updateSchema() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Smarth@2006',
      database: 'jaypeedigi'
    });

    console.log('Connected to database');

    // Alter first_page and last_page to VARCHAR(50)
    await connection.execute('ALTER TABLE chapters MODIFY COLUMN first_page VARCHAR(50)');
    await connection.execute('ALTER TABLE chapters MODIFY COLUMN last_page VARCHAR(50)');

    console.log('Schema updated successfully');

  } catch (error) {
    console.error('Schema Update Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

updateSchema();
