Spree.Collections.LineItems = Backbone.Collection.extend({
  model: Spree.Models.LineItem,
  totalPrice: function() {
    return this.reduce(function(total, lineItem) {
      return total + lineItem.total();
    }, 0);
  },
  totalQuantity: function() {
    return this.reduce(function(total, lineItem) {
      return total + parseInt(lineItem.get('quantity'));
    }, 0);
  }
});
