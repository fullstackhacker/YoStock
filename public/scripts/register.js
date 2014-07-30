function register(){ 
	var iusername = document.getElementById('username').value;
	var isymbol = document.getElementById('symbol').value; 
	var iprice = document.getElementById('price').value;

	var object = { 
		'username': iusername,
		'symbol': isymbol,
		'price': iprice
	};

	console.log(object);

	var request = new XMLHttpRequest(); 
	request.open("POST", "/register", true); 
	request.setRequestHeader("Content-type", "application/json"); 
	request.send(JSON.stringify(object));	
	console.log(JSON.parse(request.response));
} 
