DROP TABLE IF EXISTS images;

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  adds_id INT REFERENCES adds(id),
  image_urls VARCHAR(255)
);


-- INSERT INTO images (user_id,image_urls) VALUES (1,'yGBwQQToAcs6lQCWmD197C5uXBSV0P2e.jpg');
-- INSERT INTO images (user_id,image_urls) VALUES (3,'TXj4vz-g46X-61L4c1KSpGujfoOlt2TV.jpg');
-- INSERT INTO images (user_id,image_urls) VALUES (4,'8vm9pCmvtkvwOMvNTsaugD00fWJnCrx2.jpg');
-- INSERT INTO images (user_id,image_urls) VALUES (5,'JwUDu5cPMAASBjYu4ksCl4Ys34XJmOJx.jpg');
