CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--\c into pally_db
CREATE TABLE users(
    userId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    emailVerified BOOLEAN NOT NULL DEFAULT FALSE,
    isActive BOOLEAN NOT NULL DEFAULT FALSE
);
