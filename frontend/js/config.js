$.ajaxPrefilter(function(options, originalOptions, jqXHR){
    options.url = "http://localhost:8080/api" + options.url
});

var Router = Backbone.Router.extend({
    routes: {
        "": "home"
    }
});

var router = new Router();