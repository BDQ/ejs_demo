Spree.Routers.Orders = Backbone.Router.extend({
  routes: {
    'cart': 'edit'
  },

  show: function(){
    console.log('order show');
  },

  edit: function(){
    console.log('order edit');

    var view = new Spree.Views.Orders.Edit({ model: Spree.current_order });
    $('#wrapper').html(view.render().el);
  }


});
