const mysql = require('mysql2/promise');

async function fixTestimonialImages() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'jaypeedigi'
    });

    console.log('Connected to database');

    // Update testimonial image paths to have proper leading slash and lowercase extension
    const updates = [
      { id: 1, photo: '/images/avatars/1.jpg' },
      { id: 2, photo: '/images/avatars/2.jpg' },
      { id: 3, photo: '/images/avatars/3.jpg' },
      { id: 4, photo: '/images/avatars/4.jpg' },
      { id: 5, photo: '/images/avatars/5.jpg' }
    ];

    for (const update of updates) {
      await connection.execute(
        'UPDATE testimonials SET photo = ? WHERE id = ?',
        [update.photo, update.id]
      );
      console.log(`Updated testimonial ${update.id} photo to: ${update.photo}`);
    }

    // Verify the updates
    const [testimonials] = await connection.execute('SELECT id, photo FROM testimonials');
    console.log('Updated testimonials:', testimonials);

    await connection.end();
    console.log('Database updates completed successfully');
  } catch (error) {
    console.error('Database error:', error);
  }
}

fixTestimonialImages();
