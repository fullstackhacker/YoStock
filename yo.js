var request = require('request');
var queryString =  require('querystring');
var apiToken = process.env.YO_API_TOKEN; 

var yo = function(username){ 
	var data = {
		'api_token': apiToken, 
		'username': username
	};
	
	request.post({
		'url': 'http://api.justyo.co/yo/', 
		'headers': { 
			'content-type': 'application/x-www-form-urlencoded'
		}, 
		'body': queryString.stringify(data)
	}, 
	function(error, response, body){ 
		console.log(username + "\n");
		console.log(body);
	});
};

module.exports = { 'yo': yo };
