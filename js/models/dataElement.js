define([
    'jquery',
    'backbone'
], function($,  Backbone){

  var DataElement = Backbone.Model.extend({
    defaults : {
      quote   : undefined
    }
  });
  return DataElement;
});
