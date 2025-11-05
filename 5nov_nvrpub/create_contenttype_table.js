const mysql = require('mysql2/promise');

async function createContentTypeTable() {
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

    // Create contenttype table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contenttype (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(128) NOT NULL UNIQUE,
        description TEXT,
        icon VARCHAR(100) DEFAULT 'LocalLibraryIcon',
        displayOrder INT DEFAULT 0,
        ishomepage BOOLEAN DEFAULT FALSE,
        isActive BOOLEAN DEFAULT TRUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Contenttype table created successfully');

    // Insert some default content types based on the existing data
    const contentTypes = [
      { title: 'Books', slug: 'books', description: 'Educational books and publications', icon: 'MenuBookIcon', displayOrder: 1, ishomepage: true },
      { title: 'Courses', slug: 'courses', description: 'Online courses and training programs', icon: 'SchoolIcon', displayOrder: 2, ishomepage: true },
      { title: 'Videos', slug: 'videos', description: 'Educational videos and tutorials', icon: 'PlayCircleIcon', displayOrder: 3, ishomepage: false }
    ];

    for (const contentType of contentTypes) {
      try {
        await connection.execute(
          `INSERT INTO contenttype (title, slug, description, icon, displayOrder, ishomepage, isActive) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            contentType.title,
            contentType.slug,
            contentType.description,
            contentType.icon,
            contentType.displayOrder,
            contentType.ishomepage,
            true
          ]
        );
        console.log(`Inserted content type: ${contentType.title}`);
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log(`Content type ${contentType.title} already exists, skipping...`);
        } else {
          console.error(`Error inserting ${contentType.title}:`, error.message);
        }
      }
    }

    // Show the created table structure
    console.log('\nContenttype table structure:');
    const [columns] = await connection.execute('DESCRIBE contenttype');
    columns.forEach(col => {
      console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key ? `(${col.Key})` : ''}`);
    });

    // Show inserted data
    console.log('\nInserted content types:');
    const [rows] = await connection.execute('SELECT * FROM contenttype ORDER BY displayOrder');
    rows.forEach(row => {
      console.log(`- ID: ${row.id}, Title: ${row.title}, Slug: ${row.slug}, Active: ${row.isActive}`);
    });

  } catch (error) {
    console.error('Error creating contenttype table:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the creation
createContentTypeTable();
