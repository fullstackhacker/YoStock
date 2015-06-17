var mongoose = require('mongoose');

var stockSchema = new mongoose.Schema({
    username: String, 
    symbol: String, 
    price: Number, 
    range: Number
}); 

var Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock; 