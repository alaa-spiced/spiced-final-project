DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  gender VARCHAR(100),
  phone_number bigint,
  email VARCHAR(200) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  profile_pic_url VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
