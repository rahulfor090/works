-- Migration: Create api_authentications table
-- Created at: 2023-11-14 14:52:00

CREATE TABLE IF NOT EXISTS `api_authentications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `token_value` TEXT NOT NULL,
  `auth_method` ENUM('IP-Based', 'None') NOT NULL DEFAULT 'None',
  `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add index for status field for better query performance
CREATE INDEX `idx_status` ON `api_authentications` (`status`);
