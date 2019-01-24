//require modules
var mysql = require("mysql");
var inquirer = require("inquirer");
var itemID = [];
var items = [];

//establish connections to bamazon_DB
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
    console.log("\n====================\n");
    promptUser();
    connection.end();
})

function displayItems(){
    connection.query("SELECT * FROM products", function(err, res){
        //console.log(res);
        if (err) throw err;
        for(let i = 0; i < res.length; i++){
            itemID = res[i].item_id;
            //console.log("this is itemID" + itemID);
            //console.log("ID [" + res[i].item_id + "] " + res[i].product_name);
            items.push("ID [" + res[i].item_id + "] " + res[i].product_name);
        }
    })
}

function promptUser(){
    inquirer.prompt([
        {
        type: "list",
        name: "id",
        message: "Enter the [ID] of the product they would like to buy.",
        choices: [items]
        },
        {
            type: "number",
            message: "The second message should ask how many units of the product they would like to buy.",
            name: "qty"
        }
    ])
    .then(function(res){
        var a = res.id;
        switch(a){
            case "":
            break;
            default:
            console.log("something went wrong");
        }
    })
}