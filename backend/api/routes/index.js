var express = require('express');
var amqp = require('amqp');

var router = express.Router();

//returns true if the backend API is up and running
router.get('/', function(req, res) {
    res.json({
        status: true
    });
});

//sign up for yostock
router.post('/signup', function(req, res){
    //check requirements
    if( (!(req.body.username && req.body.price && req.body.symbol && req.body.range)) ){ 
        return res.json({
            status: false, 
            message: 'Failed to provide the all the required information.'
        }); 
    }


    //create the stock 
    var stock = new Stock(); 
    stock.username = req.body.username; 
    stock.symbol = req.body.symbol; 
    stock.price = req.body.price; 
    stock.range = req.body.range;

    var stockOutputString = "Username: " + stock.username + " | Symbol: " + stock.symbol + " | Price: " + stock.price + " | Range: " + stock.range; 

    //send message to python script to do heavy lifting
    var connection = amqp.createConnection({host: '127.0.0.1'});
    connection.on('ready', function(){
        connection.queue('stocks', {autoDelete: false}, function(queue){
            connection.publish('stocks', stock); 
            console.log("Sent a stock: " + stockOutputString);
        });
    });
});

module.exports = router;
