var pg = require('pg');
var connstring = process.env.DATABASE_URL;
var table = process.env.TABLE;


var register = function(username, symbol, price, range){ 
	range = '0';
	pg.connect(connstring, function(error, client, done){ 
		var query = 'INSERT INTO ' + table + ' VALUES (' + username + ', ' + symbol + ', ' + price + ', ' + range + ');';	
		client.query(query, function(err, result){ 
			done();
			if(err) return console.error(err); 
			console.log(result);
		});
	});	
};

module.exports = { 'register': register };
