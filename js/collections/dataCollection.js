define([
    'jquery',
    'backbone',
    'models/dataElement'
], function($,  Backbone, DataElement){

  var DataCollection = Backbone.Collection.extend({

      model : DataElement,

      initialize: function(options) {
        this.stream = options.stream;
        var self = this;
        this.stream.on("add_detail", function(data) {
            var dataElement = self.createNewDataElement(data);
            self.add(dataElement);
        });
      },

      createNewDataElement : function(data) {
        return new DataElement({
          quote   : data          
        });
      }
  });
  return DataCollection;
});
