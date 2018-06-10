DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price FLOAT(10,2),
  stock_quantity INT(15) NULL,
  PRIMARY KEY(item_id)
);

