Spree.Models.Taxon = Backbone.Model.extend({
  url : function() {
    return '/api/taxonomies/' + this.get('taxonomy_id') + '/' + this.get('permalink')
  },

  initialize: function(){
    this.build_associations();
  },

  build_associations: function(){
    this.taxons = new Spree.Collections.Taxons( this.get('taxons' ), {taxonomy: this} );
  },

  products: function(){
    var products = new Spree.Collections.Products()
    products.taxon_id = this.id
    return products;
  }
});
