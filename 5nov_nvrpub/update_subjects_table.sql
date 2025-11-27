-- SQL queries to add new fields to subjects table
-- Run these queries in your MySQL database

-- Add slug column
ALTER TABLE subjects 
ADD COLUMN slug VARCHAR(255) NULL AFTER subject;

-- Add description column
ALTER TABLE subjects 
ADD COLUMN description TEXT NULL AFTER slug;

-- Add sort_order column
ALTER TABLE subjects 
ADD COLUMN sort_order INT DEFAULT 0 AFTER description;

-- Add is_homepage column (0 = not shown, 1 = shown on homepage)
ALTER TABLE subjects 
ADD COLUMN is_homepage TINYINT(1) DEFAULT 0 AFTER sort_order;

-- Add is_slider column (0 = not shown, 1 = shown in slider)
ALTER TABLE subjects 
ADD COLUMN is_slider TINYINT(1) DEFAULT 0 AFTER is_homepage;

-- Add index on slug for better performance
CREATE INDEX idx_slug ON subjects(slug);

-- Add index on is_homepage for filtering
CREATE INDEX idx_is_homepage ON subjects(is_homepage);

-- Optional: Generate slugs for existing records (converts subject name to slug)
UPDATE subjects 
SET slug = LOWER(REPLACE(REPLACE(REPLACE(subject, ' ', '-'), '&', 'and'), ',', ''))
WHERE slug IS NULL OR slug = '';

-- Verify the changes
DESCRIBE subjects;

-- View updated data
SELECT * FROM subjects LIMIT 10;
