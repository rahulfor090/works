const mysql = require('mysql2/promise');

async function addPdfColumn() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'anshpandey@18072006',
      database: 'jaypeedigi'
    });

    console.log('Connected to database');

    // Check if column exists
    const [columns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'jaypeedigi' 
      AND TABLE_NAME = 'chapters' 
      AND COLUMN_NAME = 'pdf_url'
    `);

    if (columns.length === 0) {
      console.log('Adding pdf_url column to chapters table...');
      await connection.execute('ALTER TABLE chapters ADD COLUMN pdf_url VARCHAR(512) DEFAULT NULL AFTER description');
      console.log('Column pdf_url added successfully');
    } else {
      console.log('Column pdf_url already exists');
    }

  } catch (error) {
    console.error('Error adding pdf_url column:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addPdfColumn();
