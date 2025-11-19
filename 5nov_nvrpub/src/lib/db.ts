import mysql from 'mysql2/promise';

// Database connection configuration
type DBConfig = {
  host: string;
  user: string;
  password: string;
  database: string;
  waitForConnections: boolean;
  connectionLimit: number;
  queueLimit: number;
};

const dbConfig: DBConfig = {
  host: process.env.DB_HOST || process.env.MYSQL_HOST || 'localhost',
  user: process.env.DB_USER || process.env.MYSQL_USER || 'root',
  password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || 'anshpandey@18072006',
  database: process.env.DB_NAME || process.env.MYSQL_DATABASE || 'jaypeedigi',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Utility function to execute queries
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}

// Utility function to get a connection from the pool
export async function getConnection() {
  return await pool.getConnection();
}

// Test the database connection
export async function testConnection() {
  try {
    const connection = await getConnection();
    console.log('Successfully connected to the database');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return false;
  }
}

// Initialize database connection when this module is imported
(async () => {
  await testConnection();
})();
