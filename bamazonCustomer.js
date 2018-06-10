require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: process.env.password,
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    //start();
    //console.log("connected as id " + connection.threadId + "\n");
    //console.log("CONNECTED")
  });

function start(){
    readProducts();    
}

function readProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.log(res);
        askQuestion(res);
        //connection.end();
    });
}

function askQuestion(data){
    inquirer.prompt([
        {
        type:"input",
        name:"q1",
        message:"What would you like to buy? (Please insert item id)",
        },{
        type:"input",
        name:"q2",
        message:"How many would you like to buy?",
        }
]).then(function(response){
       if (response.q1.length >= 1){
           console.log(response.q1)
           for (i=0; i<data.length; i++){
               if (response.q1 == data[i].item_id){
                    if(response.q2 <= data[i].stock_quantity){
                        //console.log("there is enough in stock")
                        var newStockQuantity = data[i].stock_quantity - response.q2;
                        var productName = data[i].product_name;
                        var productPrice = data[i].price;
                        var customerRequestQ = response.q2;
                        var total = productPrice * customerRequestQ;
                        connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newStockQuantity},{item_id: response.q1}], function(err, results){
                            if (err) throw err;
                            console.log("Congrats! You just bought " + response.q2 + " of " + productName)
                            //console log saying how much customer spent price * quan
                            console.log("You spent $" + total)
                            connection.end()
                        })
                    }else{
                        console.log("Sorry. Not enough in stock")
                    }   
                //console.log(data[i])
               }
           }
          
       }else if(response.q1.length <  1){
           console.log("Please input an item number")
           
       }
    })

}

start();
