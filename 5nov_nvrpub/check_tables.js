const mysql = require('mysql2/promise');

async function checkTables() {
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

    // Show all tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('Available tables:');
    tables.forEach(table => {
      console.log('- ' + Object.values(table)[0]);
    });

    // Check if contenttypes table exists (plural)
    const [contenttypesCheck] = await connection.execute("SHOW TABLES LIKE 'contenttypes'");
    if (contenttypesCheck.length > 0) {
      console.log('\nContenttypes table structure:');
      const [columns] = await connection.execute('DESCRIBE contenttypes');
      columns.forEach(col => {
        console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key ? `(${col.Key})` : ''}`);
      });
    }

    // Check if contenttype table exists (singular)
    const [contenttypeCheck] = await connection.execute("SHOW TABLES LIKE 'contenttype'");
    if (contenttypeCheck.length > 0) {
      console.log('\nContenttype table structure:');
      const [columns] = await connection.execute('DESCRIBE contenttype');
      columns.forEach(col => {
        console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key ? `(${col.Key})` : ''}`);
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
