Spree.Collections.Variants = Backbone.Collection.extend({
  model: Spree.Models.Variant,
  url: '/api/variants',

  initialize: function(models, options){
    this.product = options.product;
  }
});
