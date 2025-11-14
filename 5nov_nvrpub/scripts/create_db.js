const mysql = require('mysql2/promise')

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'anshpandey@18072006',
    multipleStatements: true,
  })
  try {
    await connection.query("CREATE DATABASE IF NOT EXISTS jaypeedigi CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci")
    console.log('Database jaypeedigi is ready')
  } finally {
    await connection.end()
  }
}

main().catch(err => { console.error(err); process.exit(1) })


