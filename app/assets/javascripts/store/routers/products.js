Spree.Routers.Products = Backbone.Router.extend({
  routes: {
    '': 'index',
    '?page=:page_num': 'index',
    'products': 'index',
    'products/:permalink': 'show'
  },

  index: function(page_num){
    if(page_num==undefined){
      page_num = 1;
    }

    if(Spree.Data.products.page < parseInt(page_num)){
      Spree.Data.products.next_page();
    }else if(Spree.Data.products.page > parseInt(page_num)){
      Spree.Data.products.previous_page();
    }

    Spree.Data.products.page = parseInt(page_num);

    var view = new Spree.Views.Products.Index({ collection: Spree.Data.products });
    $('#wrapper').html(view.render().el);
  },

  show: function(permalink){
    console.log('product show');
    if(Spree.Data.product==undefined){
      var product = Spree.Data.products.find(function(p){ return p.get('permalink') == permalink});
    }else{
      var product = Spree.Data.product;
    }

    var view = new Spree.Views.Products.Show({ model: product });
    $('#wrapper').html(view.render().el);
  }
});
