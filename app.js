var express = require('express');
var bodyParser = require('body-parser');
var yo = require('./yo');
var register = require('./register');

var app = express();

app.use(bodyParser.json());

/* routes */
app.get('/', function(req, res){ //root route
	res.sendfile("./public/views/register.html");
});

app.get('/yo/:username', function(req, res){ //send a yo
	var username = req.params.username	
	var response = yo.yo(username);
	res.send(response);
});

app.post('/register', function(req, res){ 
	console.log(req.body);
	var good = register.register(req.body.username, req.body.symbol, req.body.price);
	if(good) res.sendfile("./public/views/success.html");
	else res.sendfile("./public/views/failure.html");
});

/* static routes */
app.get('/public/stylesheets/global.css', function(req, res){ // stylesheet route
	res.sendfile("./public/stylesheets/global.css");
});

app.get('/public/stylesheets/reset.css', function(req, res){ // stylesheet route
	res.sendfile("./public/stylesheets/reset.css");
});

app.get('/public/scripts/register.js', function(req, res){
	res.sendfile("./public/scripts/register.js");
});

/* port */
var port = Number(process.env.PORT || 5000);

/* listen to that port */
app.listen(port);
console.log("Listening on port: " + port);
