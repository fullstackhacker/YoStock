var pg = require('pg');
var connstring = process.env.DATABASE_URL;
var table = process.env.TABLE;


var register = function(username, symbol, price, range){ 
	range = '0';
	var answer = false;
	pg.connect(connstring, function(error, client, done){ 
		if(!client){ 
			console.log(error); 
			answer = false; 
		}
		var query = 'INSERT INTO ' + table + ' VALUES (' + username + ', ' + symbol + ', ' + price + ', ' + range + ');';	
		console.log(query);
		client.query(query, function(err, result){ 
			done();
			if(err){
				answer = false;
			}
			console.log(result);
			ansswer =  true;	
		});
	});
	return answer;
};

module.exports = { 'register': register };
