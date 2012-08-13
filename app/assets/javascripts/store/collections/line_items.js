Spree.Collections.LineItems = Backbone.Collection.extend({
  model: Spree.Models.LineItem,
  totalPrice: function() {
    return this.reduce(function(total, line_item) {
      return total + line_item.total();
    }, 0);
  },
  totalQuantity: function() {
    return this.reduce(function(total, line_item) {
      return total + parseInt(line_item.get('quantity'));
    }, 0);
  }
});
