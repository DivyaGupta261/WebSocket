// Filename: router.js
define([
    'jquery',
    'backbone',
    'views/home/home',
], function($, Backbone , Home) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'defaultAction'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter;
        app_router.on('route:defaultAction', function (actions) {
            var tHome = new Home();
        });

        Backbone.history.start();

    };
    return {
        initialize: initialize
    };
});
