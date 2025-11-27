// require('dotenv').config()
const mysql = require('mysql2/promise')

async function createTestimonialsTable() {
  const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'anshpandey@18072006',
    port: Number(process.env.MYSQL_PORT) || 3306,
    database: process.env.MYSQL_DATABASE || 'jaypeedigi',
  }

  let connection
  try {
    connection = await mysql.createConnection(config)
    console.log('Connected to database')

    // Create table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        userName VARCHAR(255) NOT NULL,
        professional VARCHAR(255) NOT NULL,
        photo VARCHAR(512),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    await connection.execute(createTableQuery)
    console.log('Testimonials table created or already exists')

    // Check if table is empty
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM testimonials')
    if (rows[0].count === 0) {
      console.log('Seeding sample testimonials...')
      const sampleData = [
        {
          title: 'Exceptional Resource',
          content: 'This platform has transformed how I access medical research. The curated collections are exceptional.',
          userName: 'Dr. Sarah Johnson',
          professional: 'Medical Researcher',
          photo: '/images/avatars/1.jpg'
        },
        {
          title: 'Invaluable for Work',
          content: 'A beautiful blend of knowledge and inspiration. The resources here are invaluable for my work.',
          userName: 'Prof. Michael Chen',
          professional: 'Academic Scholar',
          photo: '/images/avatars/2.jpg'
        },
        {
          title: 'Joy of Learning',
          content: 'The elegant design makes learning a joy. I find myself exploring new topics every day.',
          userName: 'Dr. Emily Rodriguez',
          professional: 'Clinical Practitioner',
          photo: '/images/avatars/3.jpg'
        }
      ]

      for (const item of sampleData) {
        await connection.execute(
          'INSERT INTO testimonials (title, content, userName, professional, photo) VALUES (?, ?, ?, ?, ?)',
          [item.title, item.content, item.userName, item.professional, item.photo]
        )
      }
      console.log('Sample testimonials inserted')
    } else {
      console.log('Testimonials table already has data')
    }

  } catch (error) {
    console.error('Error:', error)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

createTestimonialsTable()
