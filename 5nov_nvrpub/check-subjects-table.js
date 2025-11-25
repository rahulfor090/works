const mysql = require('mysql2/promise');

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'jaypeedigi'
    });
    
    console.log('✅ Connected to database\n');
    
    // Check if subjects table exists
    const [tables] = await conn.query("SHOW TABLES LIKE 'subjects'");
    
    if (tables.length === 0) {
      console.log('❌ subjects table does not exist');
      console.log('\nAvailable tables:');
      const [allTables] = await conn.query('SHOW TABLES');
      console.table(allTables);
    } else {
      console.log('✅ subjects table exists\n');
      
      // Get table structure
      console.log('📋 subjects table structure:');
      const [structure] = await conn.query('DESCRIBE subjects');
      console.table(structure);
      
      // Get current data
      console.log('\n📊 Current data in subjects table:');
      const [data] = await conn.query('SELECT * FROM subjects LIMIT 20');
      console.table(data);
    }
    
    await conn.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();
