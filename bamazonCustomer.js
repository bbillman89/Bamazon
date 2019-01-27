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
    displayItems();
    //console.log("\n====================\n");
    //promptUser();
    //console.log("\n====================\n");
    connection.end();
})

function displayItems(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for(let i = 0; i < res.length; i++){
            var a = "ID [" + res[i].item_id + "] " + res[i].product_name + " price $" + res[i].price;
            items.push(a);
            //var b = res[i].stock.quantity;
            //storeQty.push(b);
        }
        promptUser();
    })
}

function promptUser(){
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
        custQty = res.qty; //store quantity
        custProductId = res.id; //store product ID of user input
        switch(a){
            case true:
            console.log("input must be a number");
            break;
            case false:
            console.log("run a comparison function");
            break;
            default:
            console.log("something went wrong");
        }
    })
}

function order(){
    
}