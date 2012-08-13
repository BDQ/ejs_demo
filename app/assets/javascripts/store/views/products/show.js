Spree.Views.Products.Show = Backbone.View.extend({
  events: {
    'click #add-to-cart-button': 'add_to_cart'
  },

  render: function () {
    this.$el.html(JST['store/templates/products/show']({ product: this.model }));
    return this;
  },

  add_to_cart: function(evt){
    evt.preventDefault();

    var attrs = {};
    if(this.model.variants.size() == 1){
      attrs['variant_id'] = this.model.variants.first().id;
    }else{
      attrs['variant_id]'] = $('#product-variants input:checked').val()
    }

    variant = this.model.variants.find(function(v){ return v.id == attrs['variant_id'] });
    attrs['quantity'] = $('#quantity').val();
    attrs['product'] = this.model;
    attrs['price'] = variant.get('price');

    Spree.current_order.add_variant(attrs);
    Spree.current_order.save();

    Spree.Routers._active.orders.navigate('/cart', true);
  }
});
