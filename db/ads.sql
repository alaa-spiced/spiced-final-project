DROP TABLE IF EXISTS ads;

CREATE TABLE ads (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  title VARCHAR(255),
  classification VARCHAR(100),
  category VARCHAR(100),
  post_code INT,
  city VARCHAR(100),
  country VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
