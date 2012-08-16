Spree.Routers.Products = Backbone.Router.extend({
  routes: {
    '': 'index',
    '?page=:page_num': 'index',
    'products': 'index',
    'products/:permalink': 'show'
  },

  index: function(page_num){
    console.log('Product Index');

    if(page_num==undefined){
      page_num = 1;
    }

    if(Spree.Data.products==null){
      Spree.Data.products = new Spree.Collections.Products()
      Spree.Data.products.fetch({success: function(){
        Spree.Routers._active.products._index(1);
      }});
    }else{
      this._index(page_num)
    }
  },

  _index: function(page_num){
    if(Spree.Data.products.page < parseInt(page_num)){
      Spree.Data.products.next_page();
    }else if(Spree.Data.products.page > parseInt(page_num)){
      Spree.Data.products.previous_page();
    }

    Spree.Data.products.page = parseInt(page_num);

    if(Spree.Data.products.page==1 && Spree.current_rendered()){
      console.log('Skip rendering');
      $('#wrapper a[data-push-state]').click(Spree._navigate);
    }else{
      Spree.rendered_page = null;
      var view = new Spree.Views.Products.Index({ collection: Spree.Data.products });
      $('#wrapper').html(view.render().el);
    }

  },

  show: function(permalink){
    console.log('Product Show');
    var product = Spree.Data.products.find(function(p){ return p.get('permalink') == permalink});

    if(Spree.current_rendered()){
      console.log('Skip rendering');
    }else{
      Spree.rendered_page = null;
      var view = new Spree.Views.Products.Show({ model: product });
      $('#wrapper').html(view.render().el);
    }
  }
});
