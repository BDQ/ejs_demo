Spree.Models.Taxonomy = Backbone.Model.extend({
  urlRoot: 'api/taxonomies',

  initialize: function(){
    this.build_associations();
  },

  build_associations: function(){
    this.root = new Spree.Models.Taxon( this.get('root'), {taxonomy: this} );
  }
});
