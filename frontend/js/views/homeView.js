var HomeView = Backbone.View.extend({
    el: "#content", 
    render: function(){
        console.log("loading homepage");
        var template = _.template($("#home-template").html());
        this.$el.html(template);
    },
    events: {
        'input .input-text': 'uppercase', 
        'input .input-number': 'validateNumber',
        'click #monitor-button': 'monitor'
    }, 
    uppercase: function(event){
        var box = event.currentTarget; 
        box.value = box.value.toUpperCase();
    }, 
    validateNumber: function(event){
        var number = event.currentTarget.value; 
        if(number == ""){
            alert("Invalid price or range.");
            event.currentTarget.value = "";
        }

    },
    monitor: function(event){
        //grab input values
        var stock = {}; 
        stock.username = document.getElementById("username").value; 
        stock.symbol = document.getElementById("symbol").value; 
        stock.price = document.getElementById("price").value; 
        stock.range = document.getElementById("range").value; 

        var keys = Object.keys(stock);
        for(key in keys){
            console.log(stock[keys[key]]);
            if(stock[keys[key]] == undefined || stock[keys[key]].length == 0){
                alert("Invalid input for " + keys[key]); //rewrite this to be an error  in the message
                break;
            }
        }

        var status = false; 

        //send ajax request
        // post request to /signup
        // json object data: username, symbol, price and range
        $.ajax({
            url: '/signup',
            type: 'POST', 
            dataType: 'json', 
            data: stock, 
            success: function(body){
                var messageBox = document.getElementById("notification");
                status = body.status ? messageBox.setAttribute("class", "text-center text-danger") : messageBox.setAttribute("class", "text-center text-default");
                var message  = document.createTextNode(body.message);
                messageBox.appendChild(message);
            }
        })

        if(status){
            //clear boxes only on success
            document.getElementById("username").value = ""; 
            document.getElementById("symbol").value = "";
            document.getElementById("price").value = ""; 
            document.getElementById("range").value = "";
        }
    }
});

var homeView = new HomeView(); 