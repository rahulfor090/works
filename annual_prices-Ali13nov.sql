-- Create annual_prices table in jaypeedigi database
CREATE TABLE IF NOT EXISTS annual_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description LONGTEXT,
  category VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  journal VARCHAR(255) NOT NULL,
  format VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_code (code),
  INDEX idx_category (category),
  INDEX idx_region (region),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
