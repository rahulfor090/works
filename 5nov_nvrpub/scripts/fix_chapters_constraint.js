const mysql = require('mysql2/promise');

async function addUniqueConstraint() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Smarth@2006',
      database: 'jaypeedigi'
    });

    console.log('Connected to database');

    // 1. Remove duplicates, keeping the one with the highest ID
    console.log('Removing duplicate chapters...');
    await connection.execute(`
      DELETE c1 FROM chapters c1
      INNER JOIN chapters c2 
      WHERE c1.id < c2.id 
      AND c1.book_id = c2.book_id 
      AND c1.chapter_number = c2.chapter_number;
    `);
    console.log('Duplicates removed.');

    // 2. Add Unique Constraint
    console.log('Adding unique constraint on (book_id, chapter_number)...');
    try {
        await connection.execute(`
            ALTER TABLE chapters
            ADD UNIQUE KEY unique_book_chapter (book_id, chapter_number);
        `);
        console.log('Unique constraint added successfully.');
    } catch (err) {
        if (err.code === 'ER_DUP_KEY') {
            console.error('Error: Duplicate keys still exist. Could not add constraint.');
        } else if (err.code === 'ER_DUP_ENTRY') {
             console.log('Constraint already exists or duplicate entry found.');
        } else {
            console.error('Error adding constraint:', err.message);
        }
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addUniqueConstraint();
