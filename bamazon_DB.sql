CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	item_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL
);

-- item 1
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("tooth brush", "hygiene", 2.50, 200);

-- item 2
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("atlas obscura", "books", 21.82, 120);

-- item 3
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("the design entrepreneur", "books", 16.06, 173);

-- item 4
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("the old farmer's almanac 2019", "books", 5.95, 550);

-- item 5
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("hand soap", "hygiene", 7.89, 1000);

-- item 6
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("60w light bulb", "home goods", 1.49, 980);

-- item 7
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("plunger", "home goods", 7.69, 115);

-- item 8
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("20oz trash can", "home goods", 18.79, 69);

-- item 9
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("table saw", "tool & homeimprovement", 199.89, 40);

-- item 10
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("impact drill set", "tool & homeimprovement", 79.34, 55);


