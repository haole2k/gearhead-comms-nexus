-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS bacarin_racing;

-- Use the database
USE bacarin_racing;

-- Create User table with all necessary fields
CREATE TABLE IF NOT EXISTS User (
    id VARCHAR(191) PRIMARY KEY,
    username VARCHAR(191) UNIQUE NOT NULL,
    password VARCHAR(191) NOT NULL,
    role VARCHAR(191) NOT NULL DEFAULT 'USER',
    teamRole ENUM(
        'MECHANIC',
        'ENGINEER',
        'STRATEGIST',
        'DRIVER',
        'TEAM_PRINCIPAL',
        'PIT_CREW',
        'AERODYNAMICIST',
        'DATA_ANALYST',
        'RACE_ENGINEER',
        'TEST_DRIVER'
    ) NOT NULL DEFAULT 'MECHANIC',
    active BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_username ON User(username);
CREATE INDEX idx_role ON User(role);
CREATE INDEX idx_active ON User(active);
CREATE INDEX idx_teamRole ON User(teamRole);

-- Insert default admin user (password: admin)
INSERT IGNORE INTO User (
    id, 
    username, 
    password, 
    role, 
    teamRole,
    active, 
    createdAt, 
    updatedAt
) VALUES (
    UUID(),
    'admin',
    'admin',
    'ADMIN',
    'TEAM_PRINCIPAL',
    true,
    CURRENT_TIMESTAMP(3),
    CURRENT_TIMESTAMP(3)
);

-- Grant permissions (adjust user/password as needed)
GRANT ALL PRIVILEGES ON bacarin_racing.* TO 'root'@'localhost';
FLUSH PRIVILEGES;