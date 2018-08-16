DROP TABLE IF EXISTS profile_images;

CREATE TABLE profile_images (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  image_urls VARCHAR(255)
);
