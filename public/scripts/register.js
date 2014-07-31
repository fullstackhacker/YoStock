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
	request.open("POST", "/register", false); 
	request.setRequestHeader("Content-type", "application/json"); 
	request.send(JSON.stringify(object));	

	var result = JSON.parse(request.response);
	
	if(result.registration == 'success'){ 
		document.getElementById('response').innerHTML = "REGISTRATION SUCCESSFUL";
	}
	else if(result.registration == 'failure'){
		document.getElementById('response').innerHTML = "REGISTRATION FAILURE"; 
	}
} 

setInterval(function(){ 
	document.getElementById('response').innerHTML = "";
}, 3000);
