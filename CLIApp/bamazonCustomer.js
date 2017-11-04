var mysql = require("mysql");
var inquirer = require("inquirer");

 var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// connection.connect(function(err) {
//   if (err) {
//     throw err;
//   }
//   console.log("connected as id " + connection.threadId + "\n");
// // connection.query("SELECT * FROM products", function(err, res){
// //   if(err) {
// //     throw err;
// //   }
// //   console.log(res);
// //   connection.end();
// // })
// // selectAllProducts();
// // start();
// });

// selectAllProducts();
 //result = callback function

// function productsList(item_id, product_name, department_name, price, stock_quantity){
//   this.item_id = item_id,
//   this.product_name = product_name;
//   this.department_name = department_name;
//   this.price = price;
//   this.stock_quantity = stock_quantity;
//   this.printAll = function() {
//     console.log("id: " +this.item_id +
//     "\nproduct_name: " + this.product_name +
//     "\ndepartment_name: " + this.department_name +
//   "\nprice: " + this.price +
// "\nstock_quantity: " + this.stock_quantity );
//   };
//   printAll();
//   start();
//   }


// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

// promptUserPurchase will prompt the user for the item/quantity they would like to purchase
function promptUserPurchase() {
	// console.log('___ENTER promptUserPurchase___');

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
		// console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);

		var item = input.item_id;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			// If the user has selected an invalid item ID, data attay will be empty
			// console.log('data = ' + JSON.stringify(data));

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				displayInventory();

			} else {
				var productData = data[0];

				// console.log('productData = ' + JSON.stringify(productData));
				// console.log('productData.stock_quantity = ' + productData.stock_quantity);

				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Placing order!');

					// Construct the updating query string
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
					// console.log('updateQueryStr = ' + updateQueryStr);

					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
	// console.log('___ENTER displayInventory___');

	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//Prompt the user for item/quantity they would like to purchase
	  	promptUserPurchase();
	})
}

// runBamazon will execute the main application logic
function runBamazon() {
	// console.log('___ENTER runBamazon___');

	// Display the available inventory
	displayInventory();
}

// Run the application logic
runBamazon();

// function start() {
//   inquirer.prompt ([
//     {
//       type: 'input',
//       name: 'item_id',
//       message: 'type the item_id of the product you wish to buy',
//       validate: validateInput,
//       filter: Number
//
//       // validate: function(value) {
//       //   if (isNaN(value) === false) {
//       //     return true;
//       //   }
//       //   return false;
//       // }
//     }, {
//       type: "input",
//       name: "quantity",
//       message: "how many units of product you wish to buy ?",
//       filter: Number,
//       validate: validateInput
//       // validate: function(value) {
//       //   if (isNaN(value) === false) {
//       //     return true;
//       //   }
//       //   return false;
//       // }
//     }
//   ]).then(function(input) {
// var item = input.item_id;
// var quantity = input.quantity;
//
// // console.log("Select Product by user input");
// // var query = connection.query(
// //   "SELECT * FROM products WHERE item_id=?",
// //   {
// //     item_id: item
// //   }, function(err, data) {
// //     if(err) throw err;
// var queryStr = 'SELECT * FROM products WHERE ?';
//
// connection.query(queryStr, {item_id: item}, function(err, data) {
//   if (err) throw err;
//
//     if (data.length === 0) {
//       console.log("EROOR: Invaild Item ID. Please select vaild id");
//
//       selectAllProducts();
//
//     } else {
//       var productData = data[0];
//
//       if (quantity <= productData.stock_quantity) {
//         console.log("Congratulations, plese placing yout order !");
//
//         var updateQuantity = "UPDATE products SET stock_quantity = " +
//         (productData.stock_quantity - quantity) + "WHERE item_id = " + item;
//
//         connection.query(updateQuantity, function(err, res) {
//           if(err) throw err;
//           console.log("Order Succeed ! Pay $" + productData.price * quantity);
//           console.log("Thank you for shopping with us !");
//           console.log("\n________________________________________________\n");
//
//           connection.end();
//         })
//       } else {
//         console.log("Sorry, there is not enough stock, please contact us via e-mail");
//         console.log("please modify if you wanna buy");
//         console.log("\n________________________________________________\n");
//
//       selectAllProducts();
//       }
//     }
//
//   })
//
// // var userSelect = new productsList(answer.product_name, answer.department_name, answer.price,
// // answer.stock_quantity);
// // userSelect.printAll();
//   })
// }
//
// // display all products !!
// function selectAllProducts() {
//
//   selectProducts = "SELECT * FROM products";
//   connection.query(selectProducts, function(err, res) {
//     if(err) throw err;
//
//     console.log("Inventory Available: ");
//     console.log("____________________\n");
//
//     var string = "";
//     for(var i =0; i < res.length; i++) {
//       string ="";
//       string += "Item ID: " + res[i].item_id + " | ";
//       string += "Product Name: " + res[i].product_name + " | ";
//       string += "Department: " + res[i].department_name + " | ";
//       string += "Price: " + res[i].price + " | ";
//       string += "Stock: " + res[i].stock_quantity + "\n";
//
//       console.log(string);
//     }
//
//   // connection.query("SELECT * FROM products", function(err, res){
//   //   if(err) throw err;
//   //
//   //   for (var i =0; i < res.length; i++){
//   //     console.log("item ID: " + res[i].item_id + " | " + "Product Name: " +  res[i].product_name + " | " + "Department NAme: " +
//   //     res[i].department_name + " | " + "Item Price: " + res[i].price + " | " + "Available Stock: " + res[i].stock_quantity);
//   //    console.log(res[i]);
//   //   }
//     // if(err){
//     //   throw err;
//     // }
//     console.log("----------------------------------------------\n");
//
//     start();
//   });
// }
//
// function runBamazon() {
//   selectAllProducts();
//
// }
//
// runBamazon();
