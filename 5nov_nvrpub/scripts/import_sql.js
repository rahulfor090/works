/*
  Simple SQL importer for MySQL using mysql2/promise.
  Usage: node scripts/import_sql.js [path_to_sql_file]
*/

const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')

async function main() {
  const sqlPath = process.argv[2] || path.resolve(__dirname, '..', '..', '5novdbbak.sql')

  if (!fs.existsSync(sqlPath)) {
    console.error('SQL file not found at', sqlPath)
    process.exit(1)
  }

  const sqlRaw = fs.readFileSync(sqlPath, 'utf8')

  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'anshpandey@18072006',
    database: process.env.MYSQL_DATABASE || 'jaypeedigi',
    multipleStatements: true,
  })

  try {
    // Remove comments and split on semicolons at line end
    const cleaned = sqlRaw
      .replace(/\/\*[^]*?\*\//g, '') // block comments
      .replace(/--.*$/gm, '') // line comments

    const statements = cleaned
      .split(/;\s*\n|;\s*$/gm)
      .map(s => s.trim())
      .filter(Boolean)

    console.log(`Executing ${statements.length} statements from`, sqlPath)

    // Execute without a single transaction; continue on safe errors
    let executed = 0
    for (const [idx, stmt] of statements.entries()) {
      if (!stmt) continue
      try {
        await connection.query(stmt)
        executed++
        if (executed % 20 === 0) {
          console.log(`... executed ${executed} statements`)
        }
      } catch (e) {
        const msg = (e && e.message) ? e.message : ''
        const code = e && e.code
        // Ignore harmless exists errors
        const ignorable = (
          code === 'ER_DB_CREATE_EXISTS' ||
          code === 'ER_TABLE_EXISTS_ERROR' ||
          /already exists/i.test(msg) ||
          /database exists/i.test(msg)
        )
        if (ignorable) {
          continue
        }
        console.error('Error executing statement:', msg)
        throw e
      }
    }

    console.log('Import completed successfully. Executed', executed, 'statements')
  } catch (err) {
    console.error('Import failed:', err.message)
    process.exit(1)
  } finally {
    await connection.end()
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})


