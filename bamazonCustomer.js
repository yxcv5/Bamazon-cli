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

var totalOrder;

connection.connect(function(err) {
  if (err) throw err;
  totalOrder = 0;
  customerView();
});

function customerView() {
	console.log("Browsing our products...\n");
	connection.query("SELECT product_id, product_name, price, stock_quantity, product_sale FROM products", function (err, res) {
		if (err) throw err;
		var arr = [];
		for(var i = 0; i < res.length; i++) {
			var obj = {
				"product_id" : res[i].product_id,
				"product_name" : res[i].product_name,
				"price" : res[i].price
			};
			arr.push(obj);
		}
		console.table(arr);
		takeOrder(res);
	});
}

function takeOrder(products) {

	inquirer.prompt([
      {
        name: "id",
        type: "input",
        message: "Please enter the id of the product that you want to order: "
      },
      {
        name: "unit",
        type: "input",
        message: "How many do you want to order?"
      }
    ]).then(function(order) {
        var chosenProduct;
        var quantity;
    	for(var i=0; i<products.length; i++) {
    		if(products[i].product_id === order.id) {
    			chosenProduct = products[i];
    			quantity = products[i].stock_quantity - parseInt(order.unit);
    		}
    	}

    	if(quantity >= 0) {
    		var grossSale = chosenProduct.product_sale + chosenProduct.price * parseInt(order.unit);
    		totalOrder += chosenProduct.price * parseInt(order.unit);
    		placeOrder(order.id, quantity, grossSale);
    	}
    	else {
    		console.log("Insufficient quantity!\n");
    		customerView();
    	}
    	
    });
}

function placeOrder(id, quantity, sale) {
  
    connection.query("UPDATE products SET ? WHERE ?",
		[{
			stock_quantity: quantity,
			product_sale: sale
		},
		{
			product_id: id
		}],
		function(err, res) {
			if(err) throw err;
			console.log("Your order has been placed!");
            continueShopping();
		}
	); 
}


function continueShopping() {
	inquirer.prompt([
      {
        name: "continue",
        type: "confirm",
        message: "Continue shopping?",
        default: true
      }]
    ).then(function(answer) {
    	if(answer.continue)
    		customerView();
    	else {
            console.log("Your total order amount is " + totalOrder + " dollars.");
            connection.end();
    	}
    });
}