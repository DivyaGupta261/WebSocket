define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home/home.html'

], function($, _, Backbone){

  var View_home = Backbone.View.extend({
      el: $("content"),
      initialize: function() {

      }
    });
  return View_home;
});
