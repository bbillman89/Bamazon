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
    console.log("connected as id " + connection.threadId);
    console.log("\n====================\n");
    viewType();
    //connection.end();
})

//Select View Type: Customer, Manager or Supervisor
function viewType(){
    inquirer.prompt([
        {
            type: "rawlist",
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
            //return "viewing as customer"
            break;

            case "Manager":
            return "manager access"

            case "Supervisor":
            return "entered as supervisor";

            case "End Access":
            return connection.end();

            default:
            return "something went wrong"
        }
    })
    connection.query("SELECT * FROM products", function(err, res){
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
        custProductId = Number(res.id[4]); //store product ID of user input
        
        switch(a){
            case true:
            console.log("input must be a number");
            break;
            case false:
            order();
            break;
            default:
            console.log("something went wrong");
        }

        console.log(custQty);
        console.log(custProductId);
    })
}

function compare(){
    connection.query("SELECT item_id, stock_quantity FROM products", function(err, req){
        if (err) throw err;
        console.log(req);
        
        for(let index of req){
            if(index.item_id === custProductId){
                console.log("Order has been placed");
            } else {
                console.log("Insufficient quantity!");
            }
        }
        
    })
}