Spree.Routers.Products = Backbone.Router.extend({
  routes: {
    'products': 'index',
  },

  index: function(){
    var view = new Spree.Views.Products.Index({ collection: Spree.products });
    $('#main').html(view.render().el);
  }
});
