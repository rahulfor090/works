-- Additional tables for dynamic contenttype/subjectcategory management

-- Content Types table
CREATE TABLE IF NOT EXISTS contenttypes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  slug VARCHAR(128) NOT NULL UNIQUE,
  description VARCHAR(512) NOT NULL DEFAULT '',
  sortOrder INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subject Categories table
CREATE TABLE IF NOT EXISTS subjectcategories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  slug VARCHAR(128) NOT NULL UNIQUE,
  description VARCHAR(512) NOT NULL DEFAULT '',
  contenttypeId INT NOT NULL,
  sortOrder INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contenttype (contenttypeId),
  CONSTRAINT fk_subjectcategory_contenttype FOREIGN KEY (contenttypeId) REFERENCES contenttypes(id) ON DELETE CASCADE
);

-- Insert default content types
INSERT INTO contenttypes (id, name, slug, description, sortOrder) VALUES
(1, 'Books', 'books', 'Comprehensive textbooks and reference materials', 1),
(2, 'Videos', 'videos', 'Interactive video lectures and tutorials', 2),
(3, 'Journals', 'journals', 'Latest research articles and academic publications', 3)
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description), sortOrder = VALUES(sortOrder);

-- Insert comprehensive subject categories
INSERT INTO subjectcategories (name, slug, description, contenttypeId, sortOrder) VALUES
-- Books subject categories
('Alternative Medicine', 'alternative-medicine', 'Alternative and complementary medicine', 1, 1),
('Anaesthesia', 'anaesthesia', 'Anesthesiology and pain management', 1, 2),
('Anatomy', 'anatomy', 'Human anatomy and physiology', 1, 3),
('Biochemistry', 'biochemistry', 'Biochemical processes and molecular biology', 1, 4),
('Biophysics', 'biophysics', 'Biophysical principles and applications', 1, 5),
('Biostatistics and Research Methodology', 'biostatistics-and-research-methodology', 'Statistical methods in medical research', 1, 6),
('Biotechnology', 'biotechnology', 'Biotechnological applications in medicine', 1, 7),
('Cardiology', 'cardiology', 'Heart and cardiovascular system', 1, 8),
('Community Medicine', 'community-medicine', 'Public health and community healthcare', 1, 9),
('Dermatology', 'dermatology', 'Skin diseases and treatments', 1, 10),
('Emergency Medicine', 'emergency-medicine', 'Emergency care and trauma management', 1, 11),
('Forensic Medicine and Toxicology', 'forensic-medicine-and-toxicology', 'Forensic pathology and toxicology', 1, 12),
('Gastroenterology', 'gastroenterology', 'Digestive system disorders', 1, 13),
('Genetics', 'genetics', 'Medical genetics and genomics', 1, 14),
('Hematology', 'hematology', 'Blood disorders and hematologic diseases', 1, 15),
('Hospital Administration', 'hospital-administration', 'Healthcare management and administration', 1, 16),
('Laboratory Medicine', 'laboratory-medicine', 'Clinical laboratory science', 1, 17),
('Medicine', 'medicine', 'Internal medicine and general practice', 1, 18),
('Microbiology and Immunology', 'microbiology-and-immunology', 'Infectious diseases and immune system', 1, 19),
('Nephrology', 'nephrology', 'Kidney diseases and renal medicine', 1, 20),
('Neurology', 'neurology', 'Nervous system disorders', 1, 21),
('Neurosurgery', 'neurosurgery', 'Surgical treatment of nervous system', 1, 22),
('Nutrition and Dietetics', 'nutrition-and-dietetics', 'Clinical nutrition and dietary therapy', 1, 23),
('Obstetrics and Gynecology', 'obstetrics-and-gynecology', 'Women\'s health and reproductive medicine', 1, 24),
('Oncology', 'oncology', 'Cancer treatment and management', 1, 25),
('Ophthalmology', 'ophthalmology', 'Eye diseases and vision care', 1, 26),
('Orthopedics', 'orthopedics', 'Musculoskeletal system and sports medicine', 1, 27),
('Otolaryngology', 'otolaryngology', 'Ear, nose, and throat disorders', 1, 28),
('Pathology', 'pathology', 'Disease diagnosis and tissue analysis', 1, 29),
('Pediatrics', 'pediatrics', 'Child health and development', 1, 30),
('Pharmacology', 'pharmacology', 'Drug action and therapeutic use', 1, 31),
('Physiology', 'physiology', 'Normal body functions and mechanisms', 1, 32),
('Psychiatry', 'psychiatry', 'Mental health and behavioral disorders', 1, 33),
('Pulmonary & Respiratory Medicine', 'pulmonary-respiratory-medicine', 'Lung diseases and respiratory care', 1, 34),
('Radiology and Nuclear Medicine', 'radiology-and-nuclear-medicine', 'Medical imaging and diagnostic radiology', 1, 35),
('Surgery', 'surgery', 'Surgical procedures and techniques', 1, 36),
('Urology', 'urology', 'Urinary system and male reproductive health', 1, 37),

-- Videos subject categories (same as books for now)
('Alternative Medicine', 'alternative-medicine-videos', 'Alternative and complementary medicine videos', 2, 1),
('Anaesthesia', 'anaesthesia-videos', 'Anesthesiology and pain management videos', 2, 2),
('Anatomy', 'anatomy-videos', 'Human anatomy and physiology videos', 2, 3),
('Biochemistry', 'biochemistry-videos', 'Biochemical processes and molecular biology videos', 2, 4),
('Cardiology', 'cardiology-videos', 'Heart and cardiovascular system videos', 2, 5),
('Emergency Medicine', 'emergency-medicine-videos', 'Emergency care and trauma management videos', 2, 6),
('Medicine', 'medicine-videos', 'Internal medicine and general practice videos', 2, 7),
('Surgery', 'surgery-videos', 'Surgical procedures and techniques videos', 2, 8),

-- Journals subject categories
('Alternative Medicine', 'alternative-medicine-journals', 'Alternative and complementary medicine journals', 3, 1),
('Cardiology', 'cardiology-journals', 'Heart and cardiovascular system journals', 3, 2),
('Emergency Medicine', 'emergency-medicine-journals', 'Emergency care and trauma management journals', 3, 3),
('Medicine', 'medicine-journals', 'Internal medicine and general practice journals', 3, 4),
('Surgery', 'surgery-journals', 'Surgical procedures and techniques journals', 3, 5)
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description), contenttypeId = VALUES(contenttypeId), sortOrder = VALUES(sortOrder);
