var express = require("express");
var app = express();

var request = require("request");
var queryString = require("querystring");

//routes
app.get('/', function(req, res){ //root route
	res.send("Hello World");
});

app.get('/yo', function(req, res){ //send a yo
	console.log(process.env.YO_API_KEY);
	var postData = { 
		api_token: process.env.YO_API_KEY,
		username: "yourmomsintern"
	}
	console.log(queryString.stringify(postData));
	request.post({
		url:"http://api.justyo.co/yo/",
		headers: { "content-type": "application/x-www-form-urlencoded" },
		body: queryString.stringify(postData)
	},
	function(error, response, body){
		res.send(error + response + body);

		console.log(error + response + body);
	});
});

var port = Number(process.env.PORT || 5000);

app.listen(port);
console.log("Listening on port: " + port);
