//require mysql and inquirer modules

var mysql = require("mysql");
var inquirer = require("inquirer");

//Establish connections to bamazon_DB
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "518Elliott!",
    database: "bamazon_DB"
})

connection.connect(function(err){
    if (err) throw err;

})

var Buyer = function({
    this.promptUser = function(){
        inquirer.prompt([
            type: ,
            message: ,
            name:
        ])
    };
})