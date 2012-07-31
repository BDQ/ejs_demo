Spree.Models.Adjustment = Backbone.Model.extend({
  toJSON: function() {
    var object = {
      id: this.get('id')
    };
    return object;
  }
});
