router.on("route:home", function(){
    console.log("loading homepages");
    homeView.render();
});

Backbone.history.start({pushState: true});