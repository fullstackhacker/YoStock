var HomeView = Backbone.View.extend({
    el: "#content", 
    render: function(){
        console.log("loading homepage");
        var template = _.template($("#homeTemplate").html());
        this.$el.html(template);
    },
    events: {
        'input .input-text': 'uppercase', 
        'click #monitor-button': 'monitor'
    }, 
    uppercase: function(event){
        var box = event.currentTarget; 
        box.value = box.value.toUpperCase();
    }, 
    monitor: function(event){
        //grab input values

        //send ajax request

        //clear boxes
    }
});

var homeView = new HomeView(); 