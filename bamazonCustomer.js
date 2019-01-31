//require modules
var mysql = require("mysql");
var inquirer = require("inquirer");
var items = [];
var custQty;
var custProductId;

//establish connection to bamazon_DB
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "518Elliott!",
    database: "bamazon_DB"
})

//actions on connection
connection.connect(function(err){
    if (err) throw err;
    console.log("\n——————\n" 
    + "connected as id " + connection.threadId
    + "\n——————\n");
    viewType();
})

//Select View Type: Customer, Manager or Supervisor
function viewType(){
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Select Access Type",
            choices: [
                "Customer",
                "Manager",
                "Supervisor",
                "End Access",
            ]
        }
    ])
    .then(function(res){
        switch(res.action){
            case "Customer":
            startOrder();
            break;

            case "Manager":
            console.log("\n——————\n"
                + "Temporarily unavailable"
                + "\n——————\n");
            connection.end();
            break;

            case "Supervisor":
            console.log("\n——————\n"
                + "Temporarily unavailable"
                + "\n——————\n");
            connection.end();
            break;

            case "End Access":
            console.log("\n——————\n"
                + "Good Bye"
                + "\n——————\n");
            connection.end();
            break;

            default:
            return "something went wrong"
        }
    })
    var sql = "SELECT * FROM products";
    connection.query(sql, function(err, res){
        if (err) throw err;
        for(let index of res){
            var a = "ID [" + index.item_id + "] " + index.product_name + " price $" + index.price;
            items.push(a);
        }
    })
}

//Customer View
function startOrder(){
    inquirer.prompt([
        {
        type: "list",
        name: "id",
        message: "Enter [ID] of product you wish to purchase",
        choices: items
        },
        {
            type: "input",
            message: "How many units would you like to buy?",
            name: "qty"
        }
    ])
    .then(function(res){
        var a = isNaN(res.qty); //validate input
        custQty = Number(res.qty); //store quantity
        custProductId = Number(res.id[4]); //store product ID of user input / Need better way to pull number from string. Currently only pulling the first number.
        
        switch(a){
            case true:
            console.log("\n——————\n"
                + "input must be a number"
                + "\n——————\n");
            startOrder();
            break;
            
            case false:
            compare();
            break;

            default:
            console.log("\n——————\n"
                + "something went wrong"
                + "\n——————\n");
            startOrder();
        }
    })
}

function compare(){
    var sql = "SELECT item_id, stock_quantity FROM products";
    connection.query(sql, function(err, req){
        if (err) throw err;
        var dbID;
        var dbQTY;
        var itemRes;
        for(let index of req){
            if(index.item_id > custProductId){
                break
            }
            dbID = index.item_id;
            dbQTY = index.stock_quantity;
            itemRes = index;
        }
        if(custQty > dbQTY){
            console.log("\n——————\n"
                + "Sorry we only have "
                + dbQTY
                +" of this product.\n——————\n");
            connection.end();
        } else {
            console.log("\n——————\n"
                + "Order has been placed!");
            var mathStuff = dbQTY - custQty;
            var sql = "UPDATE products SET stock_quantity=" + mathStuff + " WHERE item_id=" + dbID +"";
            connection.query(sql, function(err, req){
                console.log("Item Quantity has been updated from " + dbQTY + 
                " to " + mathStuff
                + ".\n——————\n");
            })
            connection.end();
        }
    })
}