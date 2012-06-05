var Spree = {
  Views: { Shared: {}, Products: {} },
  Routers: {},
  Models: {},
  Collections: {},

  preload: {},

  init: function() {
    // this.products = new this.Collections.Products();
    // this.products.resetWithPagination(this.preload.products);
    // return Spree.Views.Products.Index({products: this.products})

    if(this.preload.products!=undefined){
      //preload products
      this.products = new this.Collections.Products();
      this.products.resetWithPagination(this.preload.products);

      new this.Routers.Products();
      Backbone.history.start();
    }

  }
}
