import mysql, { Pool, PoolOptions } from 'mysql2/promise'

let pool: Pool | null = null

function getPool(): Pool {
  if (pool) return pool

  const config: PoolOptions = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'Smarth@2006',
    port: Number(process.env.MYSQL_PORT) || 3306,
    database: process.env.MYSQL_DATABASE || 'jaypeedigi',
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
  return pool
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<[T[], any]> {
  const p = getPool()
  let connection
  try {
    connection = await p.getConnection()
    const [rows, fields] = await connection.query(sql, params)
    return [rows as T[], fields]
  } catch (error) {
    console.error('Database query error:', error)
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