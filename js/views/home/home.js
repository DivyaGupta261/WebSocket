define([
    'jquery',
    'underscore',
    'backbone',
    'collections/dataCollection',
    'controller/stream'

], function($, _, Backbone,DataCollection,Stream){
  var Home = Backbone.View.extend({
      el: $("content"),

      initialize : function() {
        var stream = new Stream();
        var self = this;
        var dataCollection   = new DataCollection({ stream: stream });
        dataCollection.on("add", function(data) {
          self.$el.append("<br>"+ JSON.stringify(data.toJSON()) +"<br>");
        });
      }
  });
  return Home;
});
