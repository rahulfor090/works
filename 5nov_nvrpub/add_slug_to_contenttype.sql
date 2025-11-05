-- Add slug field to contenttype table and populate with values based on title

-- Add slug column to contenttype table
ALTER TABLE contenttype ADD COLUMN slug VARCHAR(128) NOT NULL DEFAULT '' AFTER title;

-- Update existing records with slug values based on title
UPDATE contenttype SET slug = 'books' WHERE title = 'Books';
UPDATE contenttype SET slug = 'videos' WHERE title = 'Videos';  
UPDATE contenttype SET slug = 'journals' WHERE title = 'Journals';

-- For any other existing records, generate slug from title (lowercase, replace spaces with hyphens)
UPDATE contenttype SET slug = LOWER(REPLACE(REPLACE(title, ' ', '-'), '&', 'and')) WHERE slug = '';

-- Add unique constraint to slug column
ALTER TABLE contenttype ADD UNIQUE KEY unique_slug (slug);