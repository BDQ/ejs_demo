Spree.Routers.Orders = Backbone.Router.extend({
  routes: {
    'cart': 'edit'
  },

  edit: function(){
    console.log('Order Edit');

    var view = new Spree.Views.Orders.Edit({ model: Spree.current_order });
    $('#wrapper').html(view.render().el);
  }
});
