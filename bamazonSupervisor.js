var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');

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
  supervisorView();
});

function supervisorView() {
	inquirer.prompt([
      {
        name: "choice",
        type: "rawlist",
        message: "What task would you like to perform?",
        choices: ["View Product Sales by Department", 
                  "Create New Department", 
                  "Quit"]
      }
    ]).then(function(task) {
    	if(task.choice === "View Product Sales by Department") {
    		viewDeptSales();
    	}
    	else if(task.choice === "Create New Department") {
    		createNewDept();
    	}
    	else if(task.choice === "Quit") {
    		connection.end();
    	}
    });
}

function viewDeptSales() {
	var query = "SELECT department_id, d.department_name, over_head_costs, ";
      query += "SUM(p.product_sale) as department_sale, (SUM(p.product_sale) - over_head_costs) as profit ";
      query += "FROM departments d INNER JOIN products p ";
      query += "ON d.department_name = p.department_name ";
      query += "GROUP BY p.department_name ORDER BY profit";

	connection.query(query, function (err, res) {
		if (err) throw err;
		var arr = [];
		for(var i = 0; i < res.length; i++) {
			arr.push(res[i]);
		}
		console.table(arr);
		supervisorView();
	});
}

function createNewDept() {
	inquirer.prompt([
      {
        name: "id",
        type: "input",
        message: "Please enter the department id:"
      },
      {
        name: "name",
        type: "input",
        message: "The department name?"
      },
      {
        name: "overhead",
        type: "input",
        message: "And the overhead cost?"
      }
    ]).then(function(answer) {
    	var query = connection.query(
    	"INSERT INTO departments SET ?",
    	{
    		department_id: answer.id,
    		department_name: answer.name,
    		over_head_costs: parseFloat(answer.overhead)
        }, function(err, res) {
        	console.log(res.affectedRows + " department inserted!\n");
        	supervisorView();
        });
    });

}

