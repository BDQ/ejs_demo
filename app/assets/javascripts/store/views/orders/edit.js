Spree.Views.Orders.Edit = Backbone.View.extend({
  render: function () {
    this.$el.html(JST['store/templates/orders/edit']({ order: this.model }));
    return this;
  }
});
