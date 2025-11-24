const mysql = require('mysql2/promise');

async function checkSchema() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Smarth@2006',
    database: 'jaypeedigi'
  });

  const [rows] = await connection.execute('DESCRIBE books');
  console.log(rows);
  await connection.end();
}

checkSchema();
