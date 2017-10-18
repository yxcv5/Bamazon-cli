DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  product_id CHAR(5) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT DEFAULT 1,
  product_sale DECIMAL(10,2) DEFAULT 0.0,
  PRIMARY KEY (product_id)
);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity, product_sale)
VALUES ("H010", "Dining Table", "Home", 120.00, 20, 10000.00);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity, product_sale)
VALUES ("H003", "Watercolor Painting", "Home", 65.00, 80, 5000.00);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity, product_sale)
VALUES ("El008", "LG 24-Inch HD LED TV", "Electronics", 175.00, 10, 12000.00);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity, product_sale)
VALUES ("EE005", "The Naturalist", "Education and Entertainment", 11.00, 50, 5000.00);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity, product_sale)
VALUES ("C001", "Classic Leather Briefcase", "Clothing", 320.00, 15, 20000.00);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity, product_sale)
VALUES ("C009", "Men's Running Shoe", "Clothing", 78.00, 30, 10000.00);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity, product_sale)
VALUES ("F002", "Cheetos Cheese Flavored Snacks", "Food and Health", 5.50, 80, 8000.00);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity, product_sale)
VALUES ("F009", "Centrum Adult Multivitamin", "Food and Health", 12.00, 40, 5000.00);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity, product_sale)
VALUES ("S011", "Boy Freestyle Bike", "Sports", 78.00, 25, 9000.00);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity, product_sale)
VALUES ("EE021", "The Shack DVD", "Education and Entertainment", 9.00, 60, 4000.00);


CREATE TABLE departments (
  department_id CHAR(5) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  over_head_costs DECIMAL(10,2),
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES ("01", "Electronics", 8000.00);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES ("02", "Clothing", 7000.00);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES ("03", "Home", 10000.00);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES ("04", "Education and Entertainment", 3000.00);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES ("05", "Food and Health", 8000.00);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES ("06", "Sports", 5000.00);


-- ALTER TABLE products ADD product_sale DECIMAL(10,2) DEFAULT 0.0;


