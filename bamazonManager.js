var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  managerView();
});

function managerView() {
	inquirer.prompt([
      {
        name: "choice",
        type: "rawlist",
        message: "What task would you like to perform?",
        choices: ["View Products for Sale", 
                  "View Low Inventory", 
                  "Add to Inventory",
                  "Add New Product",
                  "Quit"]
      }
    ]).then(function(task) {
    	if(task.choice === "View Products for Sale") {
    		viewProducts();
    	}
    	else if(task.choice === "View Low Inventory") {
    		viewLowInv();
    	}
    	else if(task.choice === "Add to Inventory") {
    		connection.query("SELECT * FROM products", function (err, res) {
    			if(err) throw err;
    		    addToInv(res);
    		});
    	}
    	else if(task.choice === "Add New Product") {
    		addNewProd();
    	}
    	else if(task.choice === "Quit") {
    		connection.end();
    	}
    });
}

function viewProducts() {
	connection.query("SELECT product_id, product_name, price, stock_quantity FROM products", 
		function (err, res) {
		if (err) throw err;
		var arr = [];
		for(var i = 0; i < res.length; i++) {
			arr.push(res[i]);
		}
		console.table(arr);
		managerView();
	});
}

function viewLowInv() {
	connection.query("SELECT product_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5",
		function (err, res) {
		if (err) throw err;
		var arr = [];
		for(var i = 0; i < res.length; i++) {
			arr.push(res[i]);
		}
		console.table(arr);
		managerView();
	});
}

function addToInv(products) {

	inquirer.prompt([
      {
        name: "id",
        type: "input",
        message: "Enter the id of the product that you want to add:"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many do you want to add:"
      }
    ]).then(function(answer) {
    	var chosenProduct;
    	for(var i=0; i<products.length; i++) {
    		if(products[i].product_id === answer.id) {
    			chosenProduct = products[i];
    		}
    	}

    	if(chosenProduct) 
    		addQuantity(chosenProduct, parseInt(answer.quantity));
    	else {
    	    console.log("Product not found! You can add it as a new product");
    		addNewProd();
    	}

    });
}

function addQuantity(product, quantity) {
	var newQuantity = product.stock_quantity + quantity;
	connection.query("UPDATE products SET ? WHERE ?",
		[{
			stock_quantity: newQuantity
		},
		{
			product_id: product.product_id
		}],
		function(err, res) {
			if(err) throw err;
			console.log("Quantity updated!");
			managerView();
		}
	);
}

function addNewProd() {

	inquirer.prompt([
      {
        name: "id",
        type: "input",
        message: "Please enter the product id:"
      },
      {
        name: "name",
        type: "input",
        message: "The product name?"
      },
      {
        name: "department",
        type: "input",
        message: "Which department?"
      },
      {
        name: "price",
        type: "input",
        message: "The unit price in dollars?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many in stock?"
      }
    ]).then(function(answer) {
    	var query = connection.query(
    	"INSERT INTO products SET ?",
    	{
    		product_id: answer.id,
    		product_name: answer.name,
    		department_name: answer.department,
    		price: parseFloat(answer.price),
    		stock_quantity: parseInt(answer.quantity)
        }, function(err, res) {
        	console.log(res.affectedRows + " product inserted!\n");
        	managerView();
        });
    });
}





