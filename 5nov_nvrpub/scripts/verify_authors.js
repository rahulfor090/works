const mysql = require('mysql2/promise');

async function verifyAuthors() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Smarth@2006',
    database: 'jaypeedigi'
  });

  const [rows] = await connection.execute('SELECT isbn, book_title, authors FROM books LIMIT 5');
  console.log(rows);
  await connection.end();
}

verifyAuthors();
