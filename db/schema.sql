\c postgres;

DROP DATABASE IF EXISTS winery_app_db;
CREATE DATABASE winery_app_db;

\c winery_app_db;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(200) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  email VARCHAR(250) UNIQUE NOT NULL,
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES users (id)
    ON DELETE SET NULL
);

CREATE TABLE shops (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  address VARCHAR(200) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) 
    ON DELETE CASCADE
);

CREATE TABLE wines (
  id SERIAL PRIMARY KEY,
  brand VARCHAR(250) NOT NULL,
  type VARCHAR(200) NOT NULL,
  region VARCHAR(200) NOT NULL,
  price DECIMAL NOT NULL,
  shop_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (shop_id) REFERENCES shops (id)
    ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
);

