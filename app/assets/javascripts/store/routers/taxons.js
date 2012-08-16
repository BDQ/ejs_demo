Spree.Routers.Taxons = Backbone.Router.extend({
  routes: {
    't/*permalink': 'show'
  },

  show: function(permalink){
    console.log('Taxon Show');
    if(Spree.current_rendered()){
      console.log('Skip rendering');
    }else{
      var taxonomy = Spree.Data.taxonomies.find(function(taxonomy){
       return taxonomy.root.taxons.any(function(taxon){
          return taxon.get('permalink') == permalink
        });
      });

      var taxon = taxonomy.root.taxons.find(function(taxon){
        return taxon.get('permalink') == permalink
      });

      taxon.products().fetch({success: function(collection, resp){
        Spree.rendered_page = null;
        var view = new Spree.Views.Products.Index({ collection: collection });
        $('#wrapper').html(view.render().el);
      }})
    }

  }
});
