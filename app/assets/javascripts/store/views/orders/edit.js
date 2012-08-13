Spree.Views.Orders.Edit = Backbone.View.extend({
  events: {
    'click a[data-push-state]': Spree._navigate,
    'click #empty_cart': 'empty_cart',
    'click a.delete': 'remove_line_item',
    'click #update-button': 'update_quantities'
  },

  initialize: function(){
    this.model.on('sync', this.render, this);

    if(this.model.line_items.size()==0){
      this.model.fetch({success: function(model, resp){ 
          model.build_associations()

          var view = new Spree.Views.Orders.Edit({ model: Spree.current_order });
          $('#wrapper').html(view.render().el);
        }
      });
    }

  },

  render: function () {
    Spree.current_order.change();
    this.$el.html(JST['store/templates/orders/edit']({ order: this.model }));

    return this;
  },

  empty_cart: function(){
    this.model.empty();
  },

  remove_line_item: function(evt){
    evt.preventDefault();

    var line_item_id = $(evt.currentTarget).data('line-item-id');
    var line_item = this.model.line_items.find(function(line_item){ return line_item.id == line_item_id});
    line_item.set('quantity', 0);
    this.model.save();
  },

  update_quantities: function(evt){
    evt.preventDefault();

    _.each($('.cart-item-quantity input'), function(qty){
      var line_item_id = $(qty).data('line-item-id');
      var line_item = this.model.line_items.find(function(line_item){ return line_item.id == line_item_id});
      line_item.set('quantity', parseInt($(qty).val()));
    }, this);

    this.model.save();
  }
});
