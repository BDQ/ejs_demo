Spree.Routers.Orders = Backbone.Router.extend({
  routes: {
    'cart': 'edit'
  },

  edit: function(){
    console.log('Order Edit');

    //only render if order is actually here
    if(Spree.current_order!=undefined){
      this._edit();
    }else{
      $('wrapper').html('Loading Order');
    };
  },

  _edit: function(){
    var view = new Spree.Views.Orders.Edit({ model: Spree.current_order });
    $('#wrapper').html(view.render().el);
  }
});
