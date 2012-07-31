Spree.Collections.Orders = Backbone.Collection.extend({
  model: Spree.Models.Order,
  baseUrl: '/api/orders',
});
