define([
    'jquery',
    'underscore',
], function($, _){

  var Stream = function() {
      _.extend(this, Backbone.Events);
      var self = this;
      var DOMAIN  =  document.domain.length ? document.domain : "localhost";
      var PORT = 8001;

      self.socket = new WebSocket("ws://" + DOMAIN + ":" + PORT + "/websocket");
      console.trace("Using a standard websocket");

      self.socket.onopen = function(e) {
          self.trigger('open', e);
          console.log('socket opened');
      };

      self.socket.onerror = function(e) {
          self.trigger('error', e);
      };

      self.socket.onmessage = function(e) {
          self.trigger('message', e);
          self.trigger('data', e.data);
          self.trigger('add_detail', JSON.parse(e.data));
      };

      self.socket.onclose = function(e) {
          self.trigger('close', e);
          console.log('socket closed');
      };

      $(window).on("beforeunload", function() {
        self.socket.close();
      });
  };

  return Stream;
});
