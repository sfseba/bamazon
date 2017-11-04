DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100),
department_name VARCHAR(100),
price DECIMAL(10, 2) NOT NULL,
stock_quantity INTEGER(11) NOT NULL,
PRIMARY KEY (item_id)
);
ALTER TABLE products AUTO_INCREMENT = 1000;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Yeezy Beluga", "Shoes", 319.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Off-White Nike Presto", "Shoes", 329.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Arika Supreme Hoodie", "Clothing", 99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Off-White Air Jordan 1", "Shoes", 500, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dyson V8 Animal cordless Vacuum", "Cleaning", 700, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Schqinn Discover Hybrid Bike", "Sports & Outdoors", 250, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("All-Absorb Training Pads", "Pet Supplies", 19.99, 5500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot 2nd Generation", "Electronics", 49.99, 1500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple TV", "Electronics", 99, 15000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Video Games", 359.99, 5000);

SELECT * FROM products;
