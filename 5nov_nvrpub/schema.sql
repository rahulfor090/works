-- MySQL schema for jaypeedigi

CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  cover VARCHAR(512) NOT NULL,
  rating TINYINT NOT NULL DEFAULT 0,
  ratingCount INT NOT NULL DEFAULT 0,
  contenttype VARCHAR(64) NOT NULL,
  subjectcategory VARCHAR(64) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS specialties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  description VARCHAR(1024) NOT NULL DEFAULT '',
  icon VARCHAR(128) NOT NULL DEFAULT '',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data seed (run after tables are created)
-- Clear existing data (optional)
-- TRUNCATE TABLE courses;
-- TRUNCATE TABLE specialties;

INSERT INTO specialties (title, description, icon) VALUES
('Alternative Medicine', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore', 'ArtTrackIcon'),
('Biochemistry', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore', 'AttachMoneyIcon'),
('Biotechnology', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore', 'LocalLibraryIcon'),
('Biophysics', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore', 'ContactSupportIcon')
ON DUPLICATE KEY UPDATE title = VALUES(title);

INSERT INTO courses (id, cover, title, rating, ratingCount, contenttype, subjectcategory) VALUES
(1, '/images/courses/9789350906576.png', 'Forensic Medicine and Toxicology for Medical Students', 5, 8, 'books', 'medicine'),
(2, '/images/courses/9789352501915.png', 'Forensic Medicine and Toxicology for Medical Students', 5, 15, 'books', 'dentistry'),
(3, '/images/courses/9789352707010.png', 'Mastering Data Modeling Fundamentals', 4, 7, 'books', 'nursing'),
(4, '/images/courses/jaypee-BPJ.jpg', 'The Complete Guide Docker and Kubernetes', 4, 12, 'journals', 'medicine'),
(5, '/images/courses/jaypee-DJAS.jpg', 'Modern React with MUI & Redux', 4, 32, 'journals', 'dentistry'),
(6, '/images/courses/jaypee-DSJUOG.jpg', 'Ethical Hacking Bootcamp Zero to Mastery', 5, 14, 'journals', 'nursing'),
(7, '/images/courses/Video01.jpg', 'Adobe Lightroom For Beginners: Complete Photo Editing', 4, 6, 'videos', 'medicine'),
(8, '/images/courses/9789354652974.png', 'Forensic Medicine and Toxicology for Medical Students', 5, 8, 'books', 'medicine'),
(9, '/images/courses/9789354659508.png', 'Forensic Medicine and Toxicology for Medical Students', 5, 15, 'books', 'dentistry'),
(10, '/images/courses/9789356962026.png', 'Mastering Data Modeling Fundamentals', 4, 7, 'books', 'nursing'),
(11, '/images/courses/jaypee-IJCCM.jpg', 'The Complete Guide Docker and Kubernetes', 4, 12, 'journals', 'medicine'),
(12, '/images/courses/jaypee-IJCPD.jpg', 'Modern React with MUI & Redux', 4, 32, 'journals', 'dentistry'),
(13, '/images/courses/jaypee-IJESR.jpg', 'Ethical Hacking Bootcamp Zero to Mastery', 5, 14, 'journals', 'nursing'),
(14, '/images/courses/video-40b.png', 'Adobe Lightroom For Beginners: Complete Photo Editing', 4, 6, 'videos', 'dentistry'),
(15, '/images/courses/9789356962965.png', 'Forensic Medicine and Toxicology for Medical Students', 5, 8, 'books', 'medicine'),
(16, '/images/courses/9789356963344.png', 'Forensic Medicine and Toxicology for Medical Students', 5, 15, 'books', 'dentistry'),
(17, '/images/courses/9789356966338.png', 'Mastering Data Modeling Fundamentals', 4, 7, 'books', 'nursing'),
(18, '/images/courses/jaypee-IJKECD.jpg', 'The Complete Guide Docker and Kubernetes', 4, 12, 'journals', 'medicine'),
(19, '/images/courses/jaypee-JCDP.jpg', 'Modern React with MUI & Redux', 4, 32, 'journals', 'dentistry'),
(20, '/images/courses/jaypee-JOGI.jpg', 'Ethical Hacking Bootcamp Zero to Mastery', 5, 14, 'journals', 'nursing'),
(21, '/images/courses/video2.jpg', 'Adobe Lightroom For Beginners: Complete Photo Editing', 4, 6, 'videos', 'nursing')
ON DUPLICATE KEY UPDATE title = VALUES(title), cover = VALUES(cover), rating = VALUES(rating), ratingCount = VALUES(ratingCount), contenttype = VALUES(contenttype), subjectcategory = VALUES(subjectcategory);


