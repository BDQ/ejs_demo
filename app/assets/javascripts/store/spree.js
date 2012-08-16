var Spree = {
  Views: { Shared: {}, Products: {}, Orders: {}, Taxons: {} },
  Routers: { _active: {} },
  Models: {},
  Collections: {},

  Data: { _preload: { }, products: null, taxonomies: null },

  current_order: null,

  current_user: null,

  rendered_page: null,

  init: function(){
    if(this.Data._preload.products!=undefined){
      //preload products
      this.Data.products = new this.Collections.Products();
      this.Data.products.resetWithPagination(this.Data._preload.products);
    }

    if(this.Data._preload.taxonomies!=undefined){
      //preload taxonomies
      this.Data.taxonomies = new this.Collections.Taxonomies(this.Data._preload.taxonomies);
    }

    this.Routers._active.products = new this.Routers.Products();
    this.Routers._active.taxons = new this.Routers.Taxons();
    this.Routers._active.orders = new this.Routers.Orders();
    Backbone.history.start({pushState: true})

    $('a[data-push-state]').click(this._navigate);

    this.status = new this.Models.Status()
    this.status.fetch({success: this.set_state});
  },

  _navigate: function(evt){
    evt.preventDefault();
    Spree.Routers._active.products.navigate($(evt.currentTarget).attr('href'), true);
  },

  current_rendered: function(){
    return '/' + Backbone.history.fragment==Spree.rendered_page;
  },

  set_state: function(model, resp){
    Spree.current_order = new Spree.Models.Order(Spree.status.get('order'));

    if(Backbone.history.fragment=='cart'){
      Spree.Routers._active.orders._edit();
    }

    Spree.current_order.on('change sync', Spree.update_cart);

    $('#link-to-cart').html(JST['store/templates/shared/cart']({ count: Spree.current_order.line_items.size(), total: Spree.current_order.item_total() }));
    $('#link-to-cart a').click(Spree._navigate);

    var user = Spree.status.get('user');
    Spree.current_user = new Spree.Models.User({id: user.id})
    Spree.current_user.on('change sync', Spree.update_account);
    Spree.update_account();
  },

  update_cart: function(){
    $('#link-to-cart').html(JST['store/templates/shared/cart']({ count: Spree.current_order.line_items.size(), total: Spree.current_order.item_total() }));
    $('#link-to-cart a').click(Spree._navigate);
  },

  update_account: function(){
    $('#nav-bar .account').remove();
    $('#nav-bar').prepend(JST['store/templates/shared/account']({}));
  }
}
