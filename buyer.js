var inquirer = require("inquirer");

var BuyerOptions = function(){
    this.displayItems = function(){
        console.log();
    }
    this.promptUser = function(){
        inquirer.prompt([
            {
            type: "number",
            message: "Enter the [ID] of the product they would like to buy.",
            name: "id"
            }
        ])
        .then(function(res){
            var a = res.id;
            if(!a){
                console.log("Invalid ID");
            } else {
                inquirer.prompt([
                    {
                        type: "number",
                        message: "The second message should ask how many units of the product they would like to buy.",
                        name: "qty"
                    }
                ])
                .then(function(res){
                    if(res){
                        console.log("this should compare quantity with db");
                    }
                })
            }
        })
    }
}

module.exports = BuyerOptions;