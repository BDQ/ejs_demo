var Spree = {
  Views: { Shared: {}, Products: {}, Orders: {} },
  Routers: { _active: {} },
  Models: {},
  Collections: {},

  Data: { _preload: { }, products: null },

  current_order: null,

  init: function(){
    if(this.Data._preload.products!=undefined){
      //preload products
      this.Data.products = new this.Collections.Products();
      this.Data.products.resetWithPagination(this.Data._preload.products);
    }
    this.Routers._active.products = new this.Routers.Products();
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

  set_state: function(model, resp){
    var order = Spree.status.get('order');
    Spree.current_order = new Spree.Models.Order({number: order.number, 
      token: order.token });

    Spree.current_order.on('change', function(){
      $('#link-to-cart').html(JST['store/templates/shared/cart']({ count: Spree.current_order.line_items.size(), total: Spree.current_order.item_total() }));
      $('#link-to-cart a').click(Spree._navigate);
    });

    $('#link-to-cart').html(JST['store/templates/shared/cart']({ count: order.count, total: order.total }));
    $('#link-to-cart a').click(Spree._navigate);
  }
}
