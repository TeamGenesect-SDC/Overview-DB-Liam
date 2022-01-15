DROP DATABASE IF EXISTS sdc_overview_db;
CREATE DATABASE sdc_overview_db;
SELECT sdc_overview_db;

DROP TABLE IF EXISTS Products;
CREATE TABLE Products (
  product_id INT PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price TEXT,
  feature_id INT,
  price INT
);

DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  style_id INT PRIMARY KEY,
  product_id INT,
  name TEXT,
  sale_price TEXT,
  original_price TEXT,
  default_style BOOLEAN,
  FOREIGN KEY (product_id)
    REFERENCES Products (product_id)
);

DROP TABLE IF EXISTS features;
CREATE TABLE features (
  feature_id INT PRIMARY KEY,
  product_id INT,
  name TEXT,
  value TEXT,
  FOREIGN KEY (product_id)
    REFERENCES Products (product_id)
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  photos_id INT PRIMARY KEY,
  style_id INT,
  url TEXT,
  thumbnail_url TEXT,
  FOREIGN KEY (style_id)
    REFERENCES styles (style_id)
);

DROP TABLE IF EXISTS skus;
CREATE TABLE skus (
  skus_id INT PRIMARY KEY,
  style_id INT,
  size TEXT,
  quantity INT,
  FOREIGN KEY (style_id)
    REFERENCES styles (style_id)
);

DROP TABLE IF EXISTS related;
CREATE TABLE related (
  id SERIAL,
  current_product_id INT,
  related_product_id INT
);
