Spree.Views.Products.Index = Backbone.View.extend({
  initialize: function() {
    this.collection.on('reset paged add remove', this.render, this);
  },

  render: function () {
    this.$el.html(JST['store/templates/products/index']({ products: this.collection }));
    this.$el.find('a[data-push-state]').click(Spree._navigate);
    return this;
  }

});
