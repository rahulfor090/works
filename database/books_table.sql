-- Books Table Schema
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  -- Basic Information
  isbn VARCHAR(20) UNIQUE NOT NULL,
  book_title VARCHAR(500) NOT NULL,
  book_subtitle VARCHAR(500),
  doi VARCHAR(100),
  subject VARCHAR(200),
  society VARCHAR(200),
  
  -- Book Details
  access_type ENUM('Paid', 'Free', 'Subscription') DEFAULT 'Paid',
  book_content_type VARCHAR(100) DEFAULT 'Book',
  edition VARCHAR(50),
  book_type ENUM('Reference', 'Professional', 'Textbook'),
  book_bisac VARCHAR(100),
  
  -- Publishing Information
  publishing_year INT,
  publish_status ENUM('Staging', 'Live') DEFAULT 'Staging',
  
  -- Book Metrics
  no_of_chapters INT DEFAULT 0,
  no_of_pages INT DEFAULT 0,
  no_of_volumes INT DEFAULT 1,
  
  -- Features
  featured BOOLEAN DEFAULT FALSE,
  download_enable BOOLEAN DEFAULT FALSE,
  
  -- Rating
  rating INT DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  
  -- Cover Image
  book_cover_image VARCHAR(500),
  
  -- Rich Text Fields
  book_overview TEXT,
  supplementary_information TEXT,
  
  -- Status
  status ENUM('Active', 'Inactive', 'Deleted') DEFAULT 'Active',
  
  -- Timestamps
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_isbn (isbn),
  INDEX idx_book_title (book_title(255)),
  INDEX idx_publish_status (publish_status),
  INDEX idx_featured (featured),
  INDEX idx_status (status),
  INDEX idx_created_date (created_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample Insert Query
-- INSERT INTO books (isbn, book_title, book_subtitle, access_type, book_content_type, publish_status, featured)
-- VALUES ('9788184484175', 'Sample Medical Book', 'A Comprehensive Guide', 'Paid', 'Book', 'Live', TRUE);


-- ====================================================================
-- Chapters Table Schema
-- ====================================================================
CREATE TABLE IF NOT EXISTS chapters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  -- Foreign Key to Books
  book_id INT NOT NULL,
  book_isbn VARCHAR(20),
  
  -- Chapter Information
  chapter_number VARCHAR(50) NOT NULL,
  sequence_number INT,
  chapter_title VARCHAR(500) NOT NULL,
  doi VARCHAR(100),
  
  -- Page Information
  first_page INT,
  last_page INT,
  
  -- Access Control
  access_type ENUM('Paid', 'Free', 'Open') DEFAULT 'Paid',
  
  -- Keywords (comma-separated or JSON)
  keywords TEXT,
  
  -- Rich Text Description
  description TEXT,
  
  -- Status
  status ENUM('Active', 'Inactive', 'Deleted') DEFAULT 'Active',
  
  -- Timestamps
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Foreign Key Constraint
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  
  -- Indexes
  INDEX idx_book_id (book_id),
  INDEX idx_book_isbn (book_isbn),
  INDEX idx_chapter_number (chapter_number),
  INDEX idx_chapter_title (chapter_title(255)),
  INDEX idx_status (status),
  INDEX idx_created_date (created_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample Insert Query
-- INSERT INTO chapters (book_id, book_isbn, chapter_number, sequence_number, chapter_title, first_page, last_page, access_type, description)
-- VALUES (1, '9788184484175', '1', 1, 'Introduction to Medical Science', 1, 25, 'Free', 'This chapter covers the basics...');

-- ALTER TABLE command for existing chapters table
-- ALTER TABLE chapters ADD COLUMN sequence_number INT AFTER chapter_number;
