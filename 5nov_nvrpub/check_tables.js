const mysql = require('mysql2/promise');

async function checkTables() {
  let connection;
  
  try {
    // Create database connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Smarth@2006', // Update with your MySQL password
      database: 'jaypeedigi'
    });

    console.log('Connected to database');

    // Check if chapters table exists
    const [chaptersCheck] = await connection.execute("SHOW TABLES LIKE 'chapters'");
    if (chaptersCheck.length > 0) {
      console.log('\nChapters table keys:');
      const [columns] = await connection.execute("SHOW KEYS FROM chapters WHERE Key_name = 'PRIMARY' OR Non_unique = 0");
      columns.forEach(col => {
        console.log(`- Key: ${col.Key_name}, Column: ${col.Column_name}, Non_unique: ${col.Non_unique}`);
      });
    }

  } catch (error) {
    console.error('Error checking tables:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the check
checkTables();
