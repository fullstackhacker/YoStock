var pg = require('pg');
var connstring = process.env.DATABASE_URL;
var table = process.env.TABLE;


var register = function(username, symbol, price, range){ 
	range = '0';
	var good = true;
	pg.connect(connstring, function(error, client, done){ 
		if(!client){ 
			console.log(error);
			good = false;
		}
		var query = 'INSERT INTO ' + table + ' VALUES (\'' + username + '\', \'' + symbol + '\', \'' + price + '\', \'' + range + '\');';	
		console.log(query);
		client.query(query, function(err, result){ 
			console.log(query);
			done();
			if(err){
				console.log(err);
				good = false;
			}
			console.log("RESULT:");
			console.log(result);
			return good;
		});
	});
};

module.exports = { 'register': register };
