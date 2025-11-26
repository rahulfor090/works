-- Migration: create citations table and insert sample rows
-- Date: 2025-11-18

CREATE TABLE IF NOT EXISTS `citations` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `url` VARCHAR(1024) NOT NULL,
  `logo` VARCHAR(512) DEFAULT NULL,
  `isPublished` TINYINT(1) NOT NULL DEFAULT 1,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample rows
INSERT INTO `citations` (`title`, `url`, `logo`, `isPublished`, `createdAt`, `updatedAt`) VALUES
('PUBMED', 'https://pubmed.ncbi.nlm.nih.gov/', 'PUBMED_logo_4.png', 1, NOW(), NOW()),
('PUBMED_CENTRAL', 'https://www.ncbi.nlm.nih.gov/pmc/articles/', 'PUBMED_CENTRAL_logo_5.png', 1, NOW(), NOW());

-- End of migration
ALTER TABLE `citations`
  ADD COLUMN `location` VARCHAR(16) NOT NULL DEFAULT 'header';


  UPDATE `citations` SET `location` = 'header' WHERE `location` IS NULL OR `location` = '';
  ALTER table `citations` ADD COLUMN `page_location` VARCHAR(16) NOT NULL DEFAULT 'home';
  UPDATE `citations` SET `page_location` = 'home' WHERE `page_location` IS NULL OR `page_location` = '';