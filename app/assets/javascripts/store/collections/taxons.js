Spree.Collections.Taxons = Backbone.Collection.extend({
  model: Spree.Models.Taxon,
  url: '/api/taxons'
});
