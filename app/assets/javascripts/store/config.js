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

      this.Routers._active.products = new this.Routers.Products();
      this.Routers._active.orders = new this.Routers.Orders();
      Backbone.history.start({pushState: true})

      $('a[data-push-state]').click(this._navigate);
    }

    this.current_order = new Spree.Models.Order();
  },

  _navigate: function(evt){
    evt.preventDefault();
    Spree.Routers._active.products.navigate($(evt.currentTarget).attr('href'), true);
  }
}
