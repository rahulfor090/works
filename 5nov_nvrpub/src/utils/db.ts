import mysql, { Pool, PoolOptions } from 'mysql2/promise'
// Optional future enhancement: load external config file (config/db.json) if needed.
// Currently not used to avoid env/local reliance per user request.

let pool: Pool | null = null

function getPool(): Pool {
  if (pool) return pool

  const config: PoolOptions = {
    host: 'localhost',
    user: 'root',
    password: 'anshpandey@18072006',
    port: 3306,
    database: 'jaypeedigi',
    waitForConnections: true,
    connectionLimit: 3, // Further reduced to prevent connection exhaustion
    queueLimit: 0,
    // acquireTimeout: 60000, // Not a valid PoolOptions property
    // timeout: 60000, // Not a valid PoolOptions property  
    // idleTimeout: 30000, // Not a valid PoolOptions property
    // enableKeepAlive: true, // Not a valid PoolOptions property
    // keepAliveInitialDelay: 0, // Not a valid PoolOptions property
    // reconnect: true, // Not a valid PoolOptions property
    // maxReconnects: 3, // Not a valid PoolOptions property
  }

  pool = mysql.createPool(config)

  // Test initial connection once to surface credential errors early with clearer guidance
  pool.getConnection()
    .then(conn => {
      conn.release()
    })
    .catch(err => {
      if (err && (err as any).code === 'ER_ACCESS_DENIED_ERROR') {
        console.error('[DB INIT] Access denied. Verify MySQL credentials.\n' +
          'Tried: host=' + (process.env.MYSQL_HOST || 'localhost') +
          ' user=' + (process.env.MYSQL_USER || 'root') +
          ' db=' + (process.env.MYSQL_DATABASE || 'jaypeedigi') + '\n' +
          'Fix: create .env.local with MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE.\n' +
          'If using root, ensure password matches and auth plugin is mysql_native_password.\n' +
          'Example:\nMYSQL_HOST=localhost\nMYSQL_PORT=3306\nMYSQL_USER=appuser\nMYSQL_PASSWORD=StrongPassword!\nMYSQL_DATABASE=jaypeedigi')
      } else {
        console.error('[DB INIT] Connection test failed:', err)
      }
    })
  return pool
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<[T[], any]> {
  const p = getPool()
  let connection
  try {
    connection = await p.getConnection()
    const [rows, fields] = await connection.query(sql, params)
    return [rows as T[], fields]
  } catch (error: any) {
    const meta = {
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      database: process.env.MYSQL_DATABASE || 'jaypeedigi'
    }
    if (error?.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Database query error: ACCESS DENIED', { ...meta, message: error.message })
      console.error('Resolution tips (file-based config): 1) Edit config/db.json with valid user/password. 2) Create dedicated MySQL user: CREATE USER "appuser"@"localhost" IDENTIFIED BY "StrongPassword!"; GRANT ALL PRIVILEGES ON jaypeedigi.* TO "appuser"@"localhost"; FLUSH PRIVILEGES; 3) If using root ensure mysql_native_password: ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY "yourRootPassword"; FLUSH PRIVILEGES;')
    } else {
      console.error('Database query error:', { error, ...meta })
    }
    throw error
  } finally {
    if (connection) {
      connection.release() // Always release the connection back to the pool
    }
  }
}

export async function getConnection() {
  const p = getPool()
  return p.getConnection()
}

export default getPool