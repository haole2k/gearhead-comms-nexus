-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS bacarin_racing;

-- Use the database
USE bacarin_racing;

-- Create User table
CREATE TABLE IF NOT EXISTS User (
    id VARCHAR(191) PRIMARY KEY,
    username VARCHAR(191) UNIQUE NOT NULL,
    password VARCHAR(191) NOT NULL,
    role VARCHAR(191) NOT NULL DEFAULT 'USER',
    active BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL
);

-- Create indexes
CREATE INDEX idx_username ON User(username);
CREATE INDEX idx_role ON User(role);
CREATE INDEX idx_active ON User(active);

-- Insert default admin user if not exists
INSERT IGNORE INTO User (id, username, password, role, active, createdAt, updatedAt)
VALUES (
    UUID(),
    'admin',
    '$2a$10$YourHashedPasswordHere',
    'ADMIN',
    true,
    CURRENT_TIMESTAMP(3),
    CURRENT_TIMESTAMP(3)
);

-- Grant permissions
GRANT ALL PRIVILEGES ON bacarin_racing.* TO 'user'@'localhost';
FLUSH PRIVILEGES;